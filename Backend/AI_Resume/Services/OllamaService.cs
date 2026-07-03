using System.Text;
using System.Text.Json;

namespace AI_Resume.Services
{
    public class OllamaService
    {
        private readonly HttpClient _httpClient;

        public OllamaService(HttpClient httpClient)
        {
            _httpClient = httpClient;
            _httpClient.BaseAddress = new Uri("http://localhost:11434/");
            _httpClient.Timeout = TimeSpan.FromMinutes(5); // 🔥 IMPORTANT
        }

        public async Task<string> CompareAndAnalyze(string resumeText, string jobDescription)
        {
            // 1. Prompt fix (extra 'x' hataya)
            var prompt = $"""
    Rewrite the following resume to better match the given job description.
    Make it keyword-rich, professional, and ATS-friendly.

    === Job Description ===
    {jobDescription}

    === Resume ===
    {resumeText}

    === Optimized Resume ===
    """;

            var requestBody = new
            {
                model = "tinyllama",
                prompt = prompt,
                stream = false
            };

            var jsonRequest = JsonSerializer.Serialize(requestBody);
            var content = new StringContent(jsonRequest, Encoding.UTF8, "application/json");

            try
            {
                // 2. BaseAddress aur Timeout already constructor mein set hain
                var response = await _httpClient.PostAsync("api/generate", content);

                if (!response.IsSuccessStatusCode)
                {
                    var errorContent = await response.Content.ReadAsStringAsync();
                    return $"❌ Ollama API error: {response.StatusCode} - {errorContent}";
                }

                var jsonResponse = await response.Content.ReadAsStringAsync();
                using var doc = JsonDocument.Parse(jsonResponse);

                if (doc.RootElement.TryGetProperty("response", out var aiResponse))
                {
                    return aiResponse.GetString()?.Trim() ?? "⚠ Empty AI response";
                }

                return "❌ Unexpected Ollama response format.";
            }
            catch (TaskCanceledException)
            {
                // Ye tab hota hai jab 5 mins se upar ho jaye
                return "❌ Timeout: AI is taking too long. Check if Ollama is busy in terminal.";
            }
            catch (Exception ex)
            {
                return $"❌ Connection Error: {ex.Message}";
            }
        }
    }
}
