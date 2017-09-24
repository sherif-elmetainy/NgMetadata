using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using Microsoft.Net.Http.Headers;
using Newtonsoft.Json;

namespace CodeArt.NgMetadata
{
	/// <summary>
	/// Ng metadata middleware
	/// </summary>
    internal class NgMetadataMiddleware
    {
	    private static readonly string[] VaryHeaders = { "Accept-Language" };
		private readonly NgMetadataOptions _options;
	    private readonly INgMetadataService _ngMetadataService;
	    private readonly RequestDelegate _nextDelegate;

	    /// <summary>
	    /// constructor.
	    /// </summary>
	    /// <param name="ngMetadataService"></param>
	    /// <param name="nextDelegate"></param>
	    /// <param name="options"></param>
	    public NgMetadataMiddleware(INgMetadataService ngMetadataService,
			RequestDelegate nextDelegate,
			IOptions<NgMetadataOptions> options
			)
	    {
		    _options = options.Value;
		    _ngMetadataService = ngMetadataService ?? throw new ArgumentNullException(nameof(ngMetadataService));
		    _nextDelegate = nextDelegate ?? throw new ArgumentNullException(nameof(nextDelegate));
	    }

	    public async Task Invoke(HttpContext context)
	    {
		    var path = context.Request.Path;
		    var data = _ngMetadataService.GetModelMetadataInformation(path);
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
		    await _nextDelegate(context);
	    }
	}
}
