using System.ComponentModel.DataAnnotations;

namespace AngularExample.Models
{
    public class ExampleModel
    {
		[StringLength(10)]
		[Required]
		public string Name { get; set; }
    }
}
