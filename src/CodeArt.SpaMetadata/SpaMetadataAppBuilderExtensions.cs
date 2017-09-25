using CodeArt.SpaMetadata;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;

// ReSharper disable once CheckNamespace
namespace Microsoft.AspNetCore.Builder
{
    public static class SpaMetadataAppBuilderExtensions
    {
	    public static IApplicationBuilder UseSpaMetadata(this IApplicationBuilder applicationBuilder, string requestPath)
	    {
		    applicationBuilder.Map(requestPath, app =>
		    {
			    var options = app.ApplicationServices.GetService<IOptions<SpaMetadataOptions>>();
			    if (options?.Value.EnableResponseCaching ?? false)
			    {
				    app.UseResponseCaching();
			    }
			    app.UseMiddleware<SpaMetadataMiddleware>();
			});
		    return applicationBuilder;
	    }
    }
}
