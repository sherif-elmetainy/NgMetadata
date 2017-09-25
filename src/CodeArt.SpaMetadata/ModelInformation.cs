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
	    public string Key { get; set; }

	    /// <summary>
	    /// Property name which can be the same as <see cref="Key"/> or different depending on <see cref="SpaMetadataOptions.ModelSerializerSettings" /> and whether it has <see cref="JsonPropertyAttribute"/>.
	    /// </summary>
	    public string Name { get; set; }

	    /// <summary>
	    /// Display name. Typically set using the <see cref="DisplayAttribute"/>
	    /// </summary>
	    public string DisplayName { get; set; }

	    /// <summary>
	    /// Display name. Typically set using the <see cref="DisplayAttribute.ShortName"/>
	    /// </summary>
	    public string ShortName { get; set; }

	    /// <summary>
	    /// Description. Typically set using the <see cref="DescriptionAttribute"/>
	    /// </summary>
	    public string Description { get; set; }

	    /// <summary>
	    /// Placeholder (propmt). Typically set using the <see cref="DisplayAttribute.Prompt"/>
	    /// </summary>
	    public string PlaceHolderText { get; set; }
	}
}
