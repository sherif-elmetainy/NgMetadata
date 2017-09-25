using System;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;

namespace CodeArt.SpaMetadata
{
	public class SpaMetadataBuilder
	{
		/// <summary>
		/// Services collection
		/// </summary>
		private readonly IServiceCollection _services;
		
		/// <summary>
		/// constructor. initializes a new instance of <see cref="SpaMetadataBuilder"/> class.
		/// </summary>
		/// <param name="services"></param>
		internal SpaMetadataBuilder(IServiceCollection services)
		{
			_services = services;
		}

		/// <summary>
		/// Add a type to the allowed types collection
		/// </summary>
		/// <param name="key">Path string to get the metadata</param>
		/// <param name="type">type</param>
		/// <returns></returns>
		public SpaMetadataBuilder AddType(string key, Type type)
		{
			if (string.IsNullOrWhiteSpace(key))
			{
				throw new ArgumentException("message", nameof(key));
			}
			if (key[0] != '/')
				key = "/" + key;
			_services.Configure<SpaMetadataOptions>(options => options.AllowedTypes.Add(key, type));
			return this;
		}

		/// <summary>
		/// Add a type to the allowed types collection
		/// </summary>
		/// <param name="key">Path string to get the metadata</param>
		/// <param name="type">type</param>
		/// <returns></returns>
		public SpaMetadataBuilder AddType(PathString key, Type type)
		{
			_services.Configure<SpaMetadataOptions>(options => options.AllowedTypes.Add(key, type));
			return this;
		}

		/// <summary>
		/// Add a type to the allowed types collection
		/// </summary>
		/// <param name="type">type</param>
		/// <returns></returns>
		public SpaMetadataBuilder AddType(Type type)
		{
			_services.Configure<SpaMetadataOptions>(options => options.AllowedTypes.Add("/" + type.Name, type));
			return this;
		}

		/// <summary>
		/// Add collection of types to the allowed types collection
		/// </summary>
		/// <param name="types">types array</param>
		/// <returns></returns>
		public SpaMetadataBuilder AddTypes(params Type[] types)
		{
			foreach (var type in types)
			{
				AddType(type);
			}
			return this;
		}

		/// <summary>
		/// Enables response caching for metadata.
		/// </summary>
		/// <returns></returns>
		public SpaMetadataBuilder EnableResponseCaching()
		{
			_services.AddResponseCaching();
			_services.Configure<SpaMetadataOptions>(options => options.EnableResponseCaching = true);
			return this;
		}
	}
}
