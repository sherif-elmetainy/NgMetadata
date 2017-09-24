using CodeArt.NgMetadata;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;

// ReSharper disable once CheckNamespace
namespace Microsoft.AspNetCore.Builder
{
    public static class NgMetadataAppBuilderExtensions
    {
	    public static IApplicationBuilder UseNgMetadata(this IApplicationBuilder applicationBuilder, string requestPath)
	    {
		    applicationBuilder.Map(requestPath, app =>
		    {
			    var options = app.ApplicationServices.GetService<IOptions<NgMetadataOptions>>();
			    if (options?.Value.EnableResponseCaching ?? false)
			    {
				    app.UseResponseCaching();
			    }
			    app.UseMiddleware<NgMetadataMiddleware>();
			});
		    return applicationBuilder;
	    }
    }
}
