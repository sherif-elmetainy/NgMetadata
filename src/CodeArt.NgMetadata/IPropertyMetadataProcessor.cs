using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace CodeArt.NgMetadata
{
    public interface IPropertyMetadataProcessor
    {
	    bool CanProcess(ModelMetadata propertyModelMetadata);
	    void ProcessProperty(ModelMetadata propertyModelMetadata);
    }
}
