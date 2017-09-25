using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace CodeArt.SpaMetadata
{
    public class PropertyModelInformation : ModelInformation
    {
		/// <summary>
		/// Property type
		/// </summary>
	    public ModelInformation Type { get; set; }

		/// <summary>
		/// Display order. Typicaly set using <see cref="DisplayAttribute.Order"/>.
		/// </summary>
		public int Order { get; set; }

		/// <summary>
		/// Validation data.
		/// </summary>
	    public Dictionary<string, string> ValidationData { get; } = new Dictionary<string, string>();

		/// <summary>
		/// Additional data.
		/// </summary>
	    public Dictionary<string, string> AdditionalData { get; } = new Dictionary<string, string>();

		/// <summary>
		/// Whether the property is a collection	
		/// </summary>
	    public bool IsCollection { get; set; }

		/// <summary>
		/// Whether the property is an enum
		/// </summary>
	    public bool IsEnum { get; set; }

	    /// <summary>
	    /// Whether the property is a flags enum
	    /// </summary>
	    public bool IsFlagsEnum { get; set; }

		/// <summary>
		/// Whether the property is a simple type (string, int, date, etc etc)
		/// </summary>
		public bool IsSimpleType { get; set; }

		/// <summary>
		/// The type name of the property.
		/// </summary>
	    public string TypeName { get; set; }
    }
}
