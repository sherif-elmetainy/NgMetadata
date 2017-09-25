using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace CodeArt.SpaMetadata
{
    public interface ITypeMetadataProcessor
    {
	    bool CanProcess(ModelMetadata typeModelMetadata);
	    Task ProcessType(ModelMetadata typeModelMetadata, TypeModelInformation typeModelInformation);
    }
}
