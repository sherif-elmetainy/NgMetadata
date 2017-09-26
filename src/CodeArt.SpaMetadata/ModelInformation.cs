using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace CodeArt.SpaMetadata
{
	/// <summary>
	/// Model information
	/// </summary>
    public abstract class ModelInformation
    {
		/// <summary>
	    /// The name of the property in the server side model
	    /// </summary>
	    [JsonProperty("key")]
	    public string Key { get; set; }

		/// <summary>
		/// Property name which can be the same as <see cref="Key"/> or different depending on <see cref="SpaMetadataOptions.ModelSerializerSettings" /> and whether it has <see cref="JsonPropertyAttribute"/>.
		/// </summary>
		[JsonProperty("name")]
		public string Name { get; set; }

		/// <summary>
		/// Display name. Typically set using the <see cref="DisplayAttribute"/>
		/// </summary>
		[JsonProperty("displayName")]
		public string DisplayName { get; set; }

		/// <summary>
		/// Display name. Typically set using the <see cref="DisplayAttribute.ShortName"/>
		/// </summary>
		[JsonProperty("shortName")]
		public string ShortName { get; set; }

		/// <summary>
		/// Description. Typically set using the <see cref="DescriptionAttribute"/>
		/// </summary>
		[JsonProperty("description")]
		public string Description { get; set; }

	    /// <summary>
	    /// Display order. Typicaly set using <see cref="DisplayAttribute.Order"/>.
	    /// </summary>
	    [JsonProperty("order")]
	    public int Order { get; set; }

		/// <summary>
		/// Additional data.
		/// </summary>
		[JsonProperty("additionalData")]
		public Dictionary<string, string> AdditionalData { get; } = new Dictionary<string, string>();
	}
}
