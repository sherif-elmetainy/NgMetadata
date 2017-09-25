using System;
using CodeArt.SpaMetadata;

// ReSharper disable once CheckNamespace
namespace Microsoft.Extensions.DependencyInjection
{
    public static class SpaMetadataServiceCollectionExtensions
    {
	    public static SpaMetadataBuilder AddSpaMetadata(this IServiceCollection services,
		    Action<SpaMetadataOptions> setupAction)
	    {
		    if (services == null) throw new ArgumentNullException(nameof(services));
		    if (setupAction == null) throw new ArgumentNullException(nameof(setupAction));
		    var builder = services.AddSpaMetadata();
		    services.Configure(setupAction);
		    return builder;
	    }

	    public static SpaMetadataBuilder AddSpaMetadata(this IServiceCollection services)
	    {
		    var builder = new SpaMetadataBuilder(services);
		    services.AddSingleton<ISpaMetadataService, SpaMetadataService>();
		    return builder;
	    }
	}
}
