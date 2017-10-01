using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using Microsoft.Net.Http.Headers;
using Newtonsoft.Json;

namespace CodeArt.SpaMetadata
{
	/// <summary>
	/// Spa metadata middleware
	/// </summary>
    internal class SpaMetadataMiddleware
    {
	    private static readonly string[] VaryHeaders = { "Accept-Language" };
		private readonly SpaMetadataOptions _options;
	    private readonly RequestDelegate _nextDelegate;
	    private readonly Formatting _jsonFormatting;

	    /// <summary>
	    /// constructor.
	    /// </summary>
	    /// <param name="nextDelegate"></param>
	    /// <param name="options"></param>
	    /// <param name="environment"></param>
	    public SpaMetadataMiddleware(
			RequestDelegate nextDelegate,
			IOptions<SpaMetadataOptions> options,
			IHostingEnvironment environment
			)
	    {
		    _options = options.Value;
		    _nextDelegate = nextDelegate ?? throw new ArgumentNullException(nameof(nextDelegate));
		    _jsonFormatting = environment.IsDevelopment() ? Formatting.Indented : Formatting.None;
	    }

	    public async Task Invoke(HttpContext context, ISpaMetadataService spaMetadataService)
	    {
		    var path = context.Request.Path;
		    var data = await spaMetadataService.GetModelMetadataInformation(path);
		    if (data != null)
		    {
			    context.Response.ContentType = "application/json";
			    if (_options.EnableResponseCaching)
			    {
				    context.Response.GetTypedHeaders().CacheControl = new CacheControlHeaderValue
				    {
					    Public = true,
					    MaxAge = TimeSpan.FromDays(1)
				    };
					
					context.Response.Headers[HeaderNames.Vary] = VaryHeaders;
			    }
				var json = _options.MetadataSerializerSettings == null ? JsonConvert.SerializeObject(data, _jsonFormatting) : JsonConvert.SerializeObject(data, _jsonFormatting, _options.MetadataSerializerSettings);
				await context.Response.WriteAsync(json);
				return;
		    }
		    await _nextDelegate(context);
	    }
	}
}
