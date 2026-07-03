using AI_Resume.Models;
using AI_Resume.Services;
using Microsoft.AspNetCore.Mvc;

namespace AI_Resume.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OptimizeController : ControllerBase
    {
        private readonly OllamaService _ollamaService;

        public OptimizeController(OllamaService ollamaService)
        {
            _ollamaService = ollamaService;
        }

        [HttpPost("llama")] // 👈 ye zaroori hai
        public async Task<IActionResult> AnalyzeResume([FromBody] OptimizeRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.ResumeText) ||
                string.IsNullOrWhiteSpace(request.JobDrscription))
                return BadRequest("Resume and JobDescription are required");

            var optimized = await _ollamaService.CompareAndAnalyze(
                request.ResumeText,
                request.JobDrscription
            );

            return Ok(new { optimizedResume = optimized });
        }
    

}
}
