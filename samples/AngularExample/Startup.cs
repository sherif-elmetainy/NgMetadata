using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using AngularExample.Models;
using Microsoft.AspNetCore.Localization;

namespace AngularExample
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
	        services.AddSpaMetadata().AddTypes(typeof(ExampleModel));
			services.AddMvc();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseWebpackDevMiddleware(new WebpackDevMiddlewareOptions
                {
                    HotModuleReplacement = false
                });
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }

            app.UseStaticFiles();
			var supportedCultures = new List<CultureInfo>()
			{
				new CultureInfo("en-GB"),
				new CultureInfo("de-DE")
			};
	        app.UseRequestLocalization(new RequestLocalizationOptions()
	        {
		        DefaultRequestCulture = new RequestCulture("en-GB"),
				SupportedCultures = supportedCultures,
				SupportedUICultures = supportedCultures.Select(c => c.Parent).ToList(),
				FallBackToParentCultures = true,
				FallBackToParentUICultures = true
	        });
			app.UseSpaMetadata("/metadata");

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    "default",
                    "{controller=Home}/{action=Index}/{id?}");

                routes.MapSpaFallbackRoute(
                    "spa-fallback",
                    new { controller = "Home", action = "Index" });
            });
        }
    }
}
