using System;
using System.Collections.Generic;
using System.Globalization;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Options;

namespace CodeArt.SpaMetadata
{
	internal class SpaMetadataService : ISpaMetadataService
    {
	    private readonly IEnumerable<ITypeMetadataProcessor> _typeMetadataProcessors;
	    private readonly IEnumerable<IPropertyMetadataProcessor> _propertyMetadataProcessors;
	    private readonly SpaMetadataOptions _options;
	    private readonly IMemoryCache _memoryCache;
	    private readonly IModelMetadataProvider _modelMetadataProvider;
	    
	    private static readonly Dictionary<Type, string> BuiltInTypes = new Dictionary<Type, string>
	    {
		    {typeof(string), "string"},
		    {typeof(byte), "int"},
		    {typeof(short), "int"},
		    {typeof(int), "int"},
		    {typeof(long), "int"},
		    {typeof(ushort), "int"},
		    {typeof(ulong), "int"},
		    {typeof(uint), "int"},
		    {typeof(sbyte), "int"},

		    {typeof(decimal), "number"},
		    {typeof(float), "number"},
		    {typeof(double), "number"},

		    {typeof(DateTime), "date"},
		    {typeof(DateTimeOffset), "date"},
		    {typeof(TimeSpan), "time"},
		    {typeof(bool), "boolean"}
	    };

		public SpaMetadataService(IModelMetadataProvider modelMetadataProvider,
		    IMemoryCache memoryCache,
		    IOptions<SpaMetadataOptions> options,
			IEnumerable<ITypeMetadataProcessor> typeMetadataProcessors,
			IEnumerable<IPropertyMetadataProcessor> propertyMetadataProcessors
			)
	    {
		    _typeMetadataProcessors = typeMetadataProcessors;
		    _propertyMetadataProcessors = propertyMetadataProcessors;
		    _modelMetadataProvider = modelMetadataProvider ?? throw new ArgumentNullException(nameof(modelMetadataProvider));

		    _memoryCache = memoryCache ?? throw new ArgumentNullException(nameof(memoryCache));
		    _options = options.Value ?? throw new ArgumentNullException(nameof(options));
		}

	    private sealed class MetadataCacheKey : IEquatable<MetadataCacheKey>
	    {
		    private readonly string _key;
		    private readonly string _culture;

		    public MetadataCacheKey(string key)
		    {
			    _key = key;
			    _culture = CultureInfo.CurrentUICulture.Name;
		    }

		    public bool Equals(MetadataCacheKey other)
		    {
			    if (ReferenceEquals(null, other)) return false;
			    if (ReferenceEquals(this, other)) return true;
			    return string.Equals(_key, other._key) && string.Equals(_culture, other._culture);
		    }

		    public override bool Equals(object obj)
		    {
			    if (ReferenceEquals(null, obj)) return false;
			    if (ReferenceEquals(this, obj)) return true;
			    if (obj.GetType() != GetType()) return false;
			    return Equals((MetadataCacheKey) obj);
		    }

		    public override int GetHashCode()
		    {
			    unchecked
			    {
				    return ((_key != null ? _key.GetHashCode() : 0) * 397) ^ (_culture != null ? _culture.GetHashCode() : 0);
			    }
		    }
	    }

	    public Task<ModelInformation> GetModelMetadataInformation(string key)
	    {
			var cacheKey = new MetadataCacheKey(key);
		    return _memoryCache.GetOrCreateAsync(cacheKey, entry =>
		    {
			    if (!_options.AllowedTypes.TryGetValue(key, out var type))
				    return null;
			    var cacheOptions = _options.MemoryCacheEntryOptions;
			    if (cacheOptions != null)
			    {
				    entry.SetOptions(cacheOptions);
			    }
			    return GetModelMetadataInformation(type);
		    });
	    }

	    private Task<ModelInformation> GetModelMetadataInformation(Type type)
	    {
			var typeMetadata = _modelMetadataProvider.GetMetadataForType(type);
		    return GetModelMetadataInformation(typeMetadata);
	    }

	    private async Task<ModelInformation> GetModelMetadataInformation(ModelMetadata typeMetadata)
	    {
		    var info = new TypeModelInformation
		    {
			    Name = typeMetadata.PropertyName,
			    DisplayName = typeMetadata.DisplayName,
			    Description = typeMetadata.Description,
			    Key = typeMetadata.ModelType.Name,
			    Order = typeMetadata.Order
			};

		    foreach (var typeMetadataProperty in typeMetadata.Properties)
			{
				var propertyInfo = await GetPropertyModelInformation(typeMetadataProperty);
				info.Properties.Add(propertyInfo);
			}

		    if (_typeMetadataProcessors != null)
		    {
			    foreach (var typeMetadataProcessor in _typeMetadataProcessors)
			    {
				    if (typeMetadataProcessor.CanProcess(typeMetadata))
				    {
					    await typeMetadataProcessor.ProcessType(typeMetadata, info);
				    }
			    }
		    }
		    
			return info;
	    }

	    private async Task<PropertyModelInformation> GetPropertyModelInformation(ModelMetadata typeMetadataProperty)
	    {
		    var propertyInfo = new PropertyModelInformation
		    {
			    Name = typeMetadataProperty.PropertyName,
			    DisplayName = typeMetadataProperty.DisplayName,
			    Description = typeMetadataProperty.Description,
			    PlaceHolderText = typeMetadataProperty.Placeholder,
			    Key = typeMetadataProperty.PropertyName,
			    Order = typeMetadataProperty.Order,
				TypeName = GetBuildInType(typeMetadataProperty.ModelType)
		    };

		    if (_propertyMetadataProcessors != null)
		    {
			    foreach (var propertyMetadataProcessor in _propertyMetadataProcessors)
			    {
				    if (propertyMetadataProcessor.CanProcess(typeMetadataProperty))
				    {
					    await propertyMetadataProcessor.ProcessProperty(typeMetadataProperty, propertyInfo);
				    }
			    }
		    }
			return propertyInfo;
	    }

	    private static string GetBuildInType(Type type)
	    {
		    if (type.IsGenericType && type.GetGenericTypeDefinition() == typeof(Nullable<>))
		    {
			    return GetBuildInType(type.GetGenericArguments()[0]);
		    }
		    BuiltInTypes.TryGetValue(type, out var name);
		    return name;
	    }
    }
}
