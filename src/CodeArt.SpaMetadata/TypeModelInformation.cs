using System.Collections.Generic;

namespace CodeArt.SpaMetadata
{
    public class TypeModelInformation : ModelInformation
    {
	    public Dictionary<string, PropertyModelInformation> Properties { get; } = new Dictionary<string, PropertyModelInformation>();
    }
}
