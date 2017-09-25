using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace CodeArt.SpaMetadata
{
    public interface ITypeMetadataProcessor
    {
	    bool CanProcess(ModelMetadata typeModelMetadata);
	    bool ProcessType(ModelMetadata typeModelMetadata, TypeModelInformation typeModelInformation);
    }
}
