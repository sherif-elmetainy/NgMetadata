using System.ComponentModel.DataAnnotations;

namespace AngularExample.Models
{
    public class ExampleModel
    {
		[StringLength(10)]
		[Required]
		[Display(ResourceType = typeof(ExampleModelResources), Name = nameof(Name))]
		public string Name { get; set; }

		[DataType(DataType.Password)]
		[Required]
	    public string Password { get; set; }

	    [DataType(DataType.PhoneNumber)]
	    [Required]
	    public string Phone { get; set; }

		[EmailAddress(ErrorMessageResourceName = "EmailValidation", ErrorMessageResourceType = typeof(ExampleModelResources))]
		[Required]
		[StringLength(60)]
		[Display(ResourceType = typeof(ExampleModelResources), Name = nameof(Email))]
		public string Email { get; set; }

	    [Url(ErrorMessageResourceName = "InvalidUrl", ErrorMessageResourceType = typeof(ExampleModelResources))]
	    [Required]
	    [StringLength(60)]
	    [Display(ResourceType = typeof(ExampleModelResources), Name = nameof(WebsiteUrl))]
		public string WebsiteUrl { get; set; }

		[DataType(DataType.MultilineText)]
	    public string Description { get; set; }

		[Range(0, 100)]
	    public int Age { get; set; }

		[Range(0d, 100000d)]
	    public double Salary { get; set; }
	}
}
