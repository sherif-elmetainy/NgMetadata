using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.ResponseCaching;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;

namespace CodeArt.NgMetadata
{
	/// <summary>
	/// Options for NgMetadata service
	/// </summary>
	public class NgMetadataOptions
    {
		/// <summary>
		/// Backign field for <see cref="MemoryCacheEntryOptions"/> property.
		/// </summary>
	    private MemoryCacheEntryOptions _memoryCacheEntryOptions;

	    /// <summary>
		/// Allowed types. The <see cref="NgMetadataMiddleware" /> will return 404 Not found if the requested metadata is not in the dictionary.
		/// </summary>
	    public Dictionary<PathString, Type> AllowedTypes { get; } = new Dictionary<PathString, Type>();
	    
		/// <summary>
		/// Gets or sets whether HTTP response caching should be enabled. Typically this should be true in production and false in development environment.
		/// When true the <see cref="ResponseCachingExtensions.UseResponseCaching"/> is used to make <see cref="ResponseCachingMiddleware"/> handle response caching.
		/// When <see cref="NgMetadataBuilder.EnableResponseCaching"/> is used, it calls <see cref="ResponseCachingServicesExtensions.AddResponseCaching(IServiceCollection)" /> to add required services.
		/// When setting this property to true without calling <see cref="NgMetadataBuilder.EnableResponseCaching"/> then the caller should also call <see cref="ResponseCachingServicesExtensions.AddResponseCaching(IServiceCollection)" />.
		/// </summary>
		public bool EnableResponseCaching { get; set; }

	    /// <summary>
		/// <see cref="MemoryCacheEntryOptions"/> for metadata. Normally model metadata won't change unless a type (i.e. an assembly) has changed.
		/// When a type changes the memory cache is emptied anyway. So the default priority for <see cref="CacheItemPriority.NeverRemove"/> should be OK for most scenarios.
		/// </summary>
	    public MemoryCacheEntryOptions MemoryCacheEntryOptions
	    {
		    get => _memoryCacheEntryOptions ?? (_memoryCacheEntryOptions = new MemoryCacheEntryOptions
		    {
			    Priority = CacheItemPriority.NeverRemove
		    });
		    set => _memoryCacheEntryOptions = value;
	    }

	    /// <summary>
	    /// Serializer settings for ModelMetadata class.
	    /// </summary>
	    public JsonSerializerSettings MetadataSerializerSettings { get; set; }

		/// <summary>
		/// Serializer settings for model itself. This will determine the value of the name property (camel-case, pascal case, etc).
		/// </summary>
		public JsonSerializerSettings ModelSerializerSettings { get; set; }

		/// <summary>
		/// Processors that perform additional processing on all model types.
		/// </summary>
		public ICollection<ITypeMetadataProcessor> TypeProcessors { get; } = new List<ITypeMetadataProcessor>();

		/// <summary>
		/// Processors that perform additinal processing on all properties for all model types.
		/// </summary>
		public ICollection<IPropertyMetadataProcessor> PropertyProcessors { get; } = new List<IPropertyMetadataProcessor>();
    }
}
