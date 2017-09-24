using System;
using CodeArt.NgMetadata;

// ReSharper disable once CheckNamespace
namespace Microsoft.Extensions.DependencyInjection
{
    public static class NgMetadataServiceCollectionExtensions
    {
	    public static NgMetadataBuilder AddNgMetadata(this IServiceCollection services,
		    Action<NgMetadataOptions> setupAction)
	    {
		    if (services == null) throw new ArgumentNullException(nameof(services));
		    if (setupAction == null) throw new ArgumentNullException(nameof(setupAction));
		    var builder = services.AddNgMetadata();
		    services.Configure(setupAction);
		    return builder;
	    }

	    public static NgMetadataBuilder AddNgMetadata(this IServiceCollection services)
	    {
		    var builder = new NgMetadataBuilder(services);
		    services.AddSingleton<INgMetadataService, NgMetadataService>();
		    return builder;
	    }
	}
}
