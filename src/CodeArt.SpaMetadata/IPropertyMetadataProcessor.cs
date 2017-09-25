using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace CodeArt.SpaMetadata
{
    public interface IPropertyMetadataProcessor
    {
	    bool CanProcess(ModelMetadata propertyModelMetadata);
	    void ProcessProperty(ModelMetadata propertyModelMetadata);
    }
}
