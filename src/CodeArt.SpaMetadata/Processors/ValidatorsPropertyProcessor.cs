using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Internal;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using Microsoft.Extensions.Options;

namespace CodeArt.SpaMetadata.Processors
{
    public class ValidatorsPropertyProcessor : IPropertyMetadataProcessor
    {
	    private readonly IModelMetadataProvider _modelMetadataProvider;
	    private readonly ClientValidatorCache _clientValidatorCache;
	    private readonly CompositeClientModelValidatorProvider _validatorProvider;

		/// <summary>
		/// 
		/// </summary>
		/// <param name="modelMetadataProvider"></param>
		/// <param name="clientValidatorCache"></param>
		/// <param name="mvcViewOptions"></param>
		public ValidatorsPropertyProcessor(IModelMetadataProvider modelMetadataProvider, 
			ClientValidatorCache clientValidatorCache, 
			IOptions<MvcViewOptions> mvcViewOptions)
		{
			_modelMetadataProvider = modelMetadataProvider ?? throw new ArgumentNullException(nameof(modelMetadataProvider));
			// TODO: Even though ClientValidatorCache class is currently public, it's placed in namespace "Microsoft.AspNetCore.Mvc.Internal". Need to investigate if there is a better alternative.
			_clientValidatorCache = clientValidatorCache ?? throw new ArgumentNullException(nameof(clientValidatorCache));
			var clientValidatorProviders = mvcViewOptions?.Value?.ClientModelValidatorProviders ?? throw new ArgumentNullException(nameof(mvcViewOptions));
			_validatorProvider = new CompositeClientModelValidatorProvider(clientValidatorProviders);

		}

		public virtual bool CanProcess(ModelMetadata propertyModelMetadata) => true;
	    
	    public virtual Task ProcessProperty(ModelMetadata propertyModelMetadata, PropertyModelInformation propertyModelInformation)
	    {
			var validators = _clientValidatorCache.GetValidators(
				propertyModelMetadata,
				_validatorProvider);

		    if (validators.Count > 0)
		    {
			    var actionContext = new ActionContext();
			    var dictionary = new Dictionary<string, string>();
			    var clientModelValidationContext = new ClientModelValidationContext(actionContext, propertyModelMetadata, _modelMetadataProvider, dictionary);
			    foreach (var clientModelValidator in validators)
			    {
				    clientModelValidator.AddValidation(clientModelValidationContext);
			    }
			    foreach (var keyValuePair in dictionary)
			    {
				    propertyModelInformation.ValidationData.Add(keyValuePair.Key.Replace("data-val-", ""), keyValuePair.Value);
			    }
		    }
		    return Task.CompletedTask;
	    }
    }
}
