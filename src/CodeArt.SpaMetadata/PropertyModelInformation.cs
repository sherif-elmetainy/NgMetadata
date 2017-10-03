using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace CodeArt.SpaMetadata
{
    public class PropertyModelInformation : ModelInformation
    {
		/// <summary>
		/// Property type
		/// </summary>
		[JsonProperty("type")]
	    public ModelInformation Type { get; set; }

		/// <summary>
	    /// Placeholder (propmt). Typically set using the <see cref="DisplayAttribute.Prompt"/>
	    /// </summary>
	    [JsonProperty("placeHolderText")]
	    public string PlaceHolderText { get; set; }

		/// <summary>
		/// Validation data.
		/// </summary>
		[JsonProperty("validationData")]
		public Dictionary<string, string> ValidationData { get; } = new Dictionary<string, string>();

		/// <summary>
		/// Whether the property is a collection	
		/// </summary>
		[JsonProperty("isCollection")]
	    public bool IsCollection { get; set; }

		/// <summary>
		/// Whether the property is an enum
		/// </summary>
		[JsonProperty("isEnum")]
	    public bool IsEnum { get; set; }

		/// <summary>
		/// Whether the property is a flags enum
		/// </summary>
		[JsonProperty("isFlagsEnum")]
		public bool IsFlagsEnum { get; set; }

		/// <summary>
		/// The type name of the property.
		/// </summary>
		[JsonProperty("typeName")]
		public string TypeName { get; set; }

	    /// <summary>
	    /// The type name of the property.
	    /// </summary>
	    [JsonProperty("elementMetadata")]
	    public PropertyModelInformation ElementModelInformation { get; set; }
	}
}
