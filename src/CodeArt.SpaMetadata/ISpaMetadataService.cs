using System.Threading.Tasks;

namespace CodeArt.SpaMetadata
{
    public interface ISpaMetadataService
    {
	    Task<ModelInformation> GetModelMetadataInformation(string key);
    }
}
