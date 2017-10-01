using System;
using System.Threading.Tasks;
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
	    private readonly ISpaMetadataService _ngMetadataService;
	    private readonly RequestDelegate _nextDelegate;

	    /// <summary>
	    /// constructor.
	    /// </summary>
	    /// <param name="ngMetadataService"></param>
	    /// <param name="nextDelegate"></param>
	    /// <param name="options"></param>
	    public SpaMetadataMiddleware(ISpaMetadataService ngMetadataService,
			RequestDelegate nextDelegate,
			IOptions<SpaMetadataOptions> options
			)
	    {
		    _options = options.Value;
		    _ngMetadataService = ngMetadataService ?? throw new ArgumentNullException(nameof(ngMetadataService));
		    _nextDelegate = nextDelegate ?? throw new ArgumentNullException(nameof(nextDelegate));
	    }

	    public async Task Invoke(HttpContext context)
	    {
		    var path = context.Request.Path;
		    var data = await _ngMetadataService.GetModelMetadataInformation(path);
		    if (data == null)
		    {
			    context.Response.StatusCode = 404;
		    }
		    else
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
				var json = _options.MetadataSerializerSettings == null ? JsonConvert.SerializeObject(data) : JsonConvert.SerializeObject(data, _options.MetadataSerializerSettings);
				await context.Response.WriteAsync(json);
		    }
	    }
	}
}
