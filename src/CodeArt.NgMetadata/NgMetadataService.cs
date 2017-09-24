using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Internal;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Options;

namespace CodeArt.NgMetadata
{
	internal class NgMetadataService : INgMetadataService
    {
	    private readonly NgMetadataOptions _options;
	    private readonly IMemoryCache _memoryCache;
	    private readonly IModelMetadataProvider _modelMetadataProvider;
	    private readonly ClientValidatorCache _clientValidatorCache;
	    private readonly CompositeClientModelValidatorProvider _validatorProvider;

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

		public NgMetadataService(IModelMetadataProvider modelMetadataProvider,
		    IOptions<MvcViewOptions> mvcViewOptions,
		    ClientValidatorCache clientValidatorCache,
		    IMemoryCache memoryCache,
		    IOptions<NgMetadataOptions> options)
	    {
			_modelMetadataProvider = modelMetadataProvider ?? throw new ArgumentNullException(nameof(modelMetadataProvider));

		    var clientValidatorProviders = mvcViewOptions?.Value?.ClientModelValidatorProviders ?? throw new ArgumentNullException(nameof(mvcViewOptions));
		    _validatorProvider = new CompositeClientModelValidatorProvider(clientValidatorProviders);
		    _clientValidatorCache = clientValidatorCache ?? throw new ArgumentNullException(nameof(clientValidatorCache));
		    _memoryCache = memoryCache ?? throw new ArgumentNullException(nameof(memoryCache));
		    _options = options.Value ?? throw new ArgumentNullException(nameof(options));
		}

	    public ModelInformation GetModelMetadataInformation(string key)
	    {
		    if (!_options.AllowedTypes.TryGetValue(key, out var type))
			    return null;
		    return GetModelMetadataInformation(type);
	    }

	    private ModelInformation GetModelMetadataInformation(Type type)
	    {
			var typeMetadata = _modelMetadataProvider.GetMetadataForType(type);
		    return GetModelMetadataInformation(typeMetadata);
	    }

	    private ModelInformation GetModelMetadataInformation(ModelMetadata typeMetadata)
	    {
		    var info = new TypeModelInformation
		    {
			    Name = typeMetadata.PropertyName,
			    DisplayName = typeMetadata.DisplayName,
			    Description = typeMetadata.Description,
			    PlaceHolderText = typeMetadata.Placeholder,
			    Key = typeMetadata.ModelType.Name
		    };

		    foreach (var typeMetadataProperty in typeMetadata.Properties)
			{
				var propertyInfo = GetPropertyModelInformation(typeMetadataProperty);
				info.Properties.Add(propertyInfo.Key, propertyInfo as PropertyModelInformation);
			}
		    
			return info;
	    }

	    private PropertyModelInformation GetPropertyModelInformation(ModelMetadata typeMetadataProperty)
	    {
		    var propertyInfo = new PropertyModelInformation
		    {
			    Name = typeMetadataProperty.PropertyName,
			    DisplayName = typeMetadataProperty.DisplayName,
			    Description = typeMetadataProperty.Description,
			    PlaceHolderText = typeMetadataProperty.Placeholder,
			    Key = typeMetadataProperty.PropertyName,
			    Order = typeMetadataProperty.Order
		    };
		    var validators = _clientValidatorCache.GetValidators(
			    typeMetadataProperty,
			    _validatorProvider);

		    if (validators.Count > 0)
		    {
			    var actionContext = new ActionContext();
			    var dictionary = new Dictionary<string, string>();
			    var clientModelValidationContext = new ClientModelValidationContext(actionContext, typeMetadataProperty, _modelMetadataProvider, dictionary);
			    foreach (var clientModelValidator in validators)
			    {
				    clientModelValidator.AddValidation(clientModelValidationContext);
			    }
			    foreach (var keyValuePair in dictionary)
			    {
				    propertyInfo.ValidationData.Add(keyValuePair.Key.Replace("data-val-", ""), keyValuePair.Value);
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
