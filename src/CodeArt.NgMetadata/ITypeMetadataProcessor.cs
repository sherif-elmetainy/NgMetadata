using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace CodeArt.NgMetadata
{
    public interface ITypeMetadataProcessor
    {
	    bool CanProcess(ModelMetadata typeModelMetadata);
	    bool ProcessType(ModelMetadata typeModelMetadata, TypeModelInformation typeModelInformation);
    }
}
