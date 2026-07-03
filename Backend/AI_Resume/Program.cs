using AI_Resume.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services
builder.Services.AddControllers();

// 🔥 THIS LINE IS MUST
// 🔥 HttpClient ko configuration ke saath add karein
builder.Services.AddHttpClient<OllamaService>(client =>
{
    // Ollama ka default address
    client.BaseAddress = new Uri("http://localhost:11434/");
    // AI processing mein waqt lagta hai, isliye timeout 5 minutes rakhein
    client.Timeout = TimeSpan.FromMinutes(5);
});

builder.Services.AddCors(option =>
{
    option.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
    });
});

// Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowAll");
app.UseHttpsRedirection();
app.UseRouting();
app.UseAuthorization();
app.MapControllers();
app.Run();
