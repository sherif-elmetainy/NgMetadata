using System.Collections.Generic;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace CodeArt.SpaMetadata
{
    public class TypeModelInformation : ModelInformation
    {
		[JsonProperty("properties")]
	    public List<PropertyModelInformation> Properties { get; } = new List<PropertyModelInformation>();
    }
}
