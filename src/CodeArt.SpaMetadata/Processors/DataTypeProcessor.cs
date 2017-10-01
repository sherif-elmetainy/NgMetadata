using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace CodeArt.SpaMetadata.Processors
{
    public class DataTypeProcessor : IPropertyMetadataProcessor
    {
	    public virtual bool CanProcess(ModelMetadata propertyModelMetadata) => true;
	    
	    public Task ProcessProperty(ModelMetadata propertyModelMetadata, PropertyModelInformation propertyModelInformation)
	    {
		    switch (propertyModelMetadata.DataTypeName)
		    {
			    case nameof(DataType.Password):
				    propertyModelInformation.AdditionalData["password"] = "true";
				    break;
			    case nameof(DataType.MultilineText):
				    propertyModelInformation.AdditionalData["multiline"] = "true";
				    break;
		    }
		    return Task.CompletedTask;
	    }
    }
}
