using System;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;

namespace CodeArt.NgMetadata
{
	public class NgMetadataBuilder
	{
		/// <summary>
		/// Services collection
		/// </summary>
		private readonly IServiceCollection _services;
		
		/// <summary>
		/// constructor. initializes a new instance of <see cref="NgMetadataBuilder"/> class.
		/// </summary>
		/// <param name="services"></param>
		internal NgMetadataBuilder(IServiceCollection services)
		{
			_services = services;
		}

		/// <summary>
		/// Add a type to the allowed types collection
		/// </summary>
		/// <param name="key">Path string to get the metadata</param>
		/// <param name="type">type</param>
		/// <returns></returns>
		public NgMetadataBuilder AddType(string key, Type type)
		{
			if (string.IsNullOrWhiteSpace(key))
			{
				throw new ArgumentException("message", nameof(key));
			}
			if (key[0] != '/')
				key = "/" + key;
			_services.Configure<NgMetadataOptions>(options => options.AllowedTypes.Add(key, type));
			return this;
		}

		/// <summary>
		/// Add a type to the allowed types collection
		/// </summary>
		/// <param name="key">Path string to get the metadata</param>
		/// <param name="type">type</param>
		/// <returns></returns>
		public NgMetadataBuilder AddType(PathString key, Type type)
		{
			_services.Configure<NgMetadataOptions>(options => options.AllowedTypes.Add(key, type));
			return this;
		}

		/// <summary>
		/// Add a type to the allowed types collection
		/// </summary>
		/// <param name="type">type</param>
		/// <returns></returns>
		public NgMetadataBuilder AddType(Type type)
		{
			_services.Configure<NgMetadataOptions>(options => options.AllowedTypes.Add("/" + type.Name, type));
			return this;
		}

		/// <summary>
		/// Add collection of types to the allowed types collection
		/// </summary>
		/// <param name="types">types array</param>
		/// <returns></returns>
		public NgMetadataBuilder AddTypes(params Type[] types)
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
		public NgMetadataBuilder EnableResponseCaching()
		{
			_services.AddResponseCaching();
			_services.Configure<NgMetadataOptions>(options => options.EnableResponseCaching = true);
			return this;
		}
	}
}
