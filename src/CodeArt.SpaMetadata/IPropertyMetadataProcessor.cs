using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace CodeArt.SpaMetadata
{
    public interface IPropertyMetadataProcessor
    {
	    bool CanProcess(ModelMetadata propertyModelMetadata);
	    Task ProcessProperty(ModelMetadata propertyModelMetadata, PropertyModelInformation propertyModelInformation);
    }
}
