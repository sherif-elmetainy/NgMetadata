using System.Globalization;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace CodeArt.SpaMetadata.Processors
{
    public class DefaultNamesProcessor : ITypeMetadataProcessor, IPropertyMetadataProcessor
    {
	    public virtual bool CanProcess(ModelMetadata typeModelMetadata) => true;
	    
	    public virtual Task ProcessProperty(ModelMetadata propertyModelMetadata, PropertyModelInformation propertyModelInformation)
	    {
			ProcessModelInformation(propertyModelInformation);
		    return Task.CompletedTask;
		}

	    public virtual Task ProcessType(ModelMetadata typeModelMetadata, TypeModelInformation typeModelInformation)
	    {
			ProcessModelInformation(typeModelInformation);
			return Task.CompletedTask;
		}

	    private static void ProcessModelInformation(ModelInformation modelInformation)
	    {
		    if (modelInformation.DisplayName == null)
			    modelInformation.DisplayName = SplitWords(modelInformation.Key);
		    if (modelInformation.ShortName == null)
			    modelInformation.ShortName = modelInformation.DisplayName;
	    }

	    /// <summary>
	    ///     convert pascal or camel case name to words.
	    ///     Example: "DateOfBirth" becomes "Date of birth"
	    /// </summary>
	    /// <param name="pascalOrCamelCaseName">pascal or camel case name</param>
	    /// <returns>name as words</returns>
	    private static string SplitWords(string pascalOrCamelCaseName)
	    {
		    if (string.IsNullOrWhiteSpace(pascalOrCamelCaseName))
		    {
			    return "";
		    }
			var allNonstartingCapitals = new Regex("(?<=\\P{Lu})\\p{Lu}(?!\\p{Lu})");
			return allNonstartingCapitals.Replace(pascalOrCamelCaseName, m => " " + m.Value.ToLower(CultureInfo.CurrentUICulture));
	    }
	}
}
