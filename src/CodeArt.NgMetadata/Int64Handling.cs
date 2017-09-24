namespace CodeArt.NgMetadata
{
	/// <summary>
	/// Specificy how model properties of type <see cref="long"/> or <see cref="ulong"/> are treated.
	/// </summary>
    public enum Int64Handling
    {
		/// <summary>
		/// The property is treated as if it has type int. 
		/// Values outside the limits of the maximum integer value for the number type in Javascript will 
		/// result in invalid values being sent to the server that the server will not be able to parse.
		/// </summary>
		TreatAsInt = 0,
		/// <summary>
		/// The property is treated as if it has type string on the client side.
		/// </summary>
		TreatAsString = 1,
		/// <summary>
		/// Throw an error when generating the metadata for that model type. 
		/// </summary>
		Error = 2
    }
}
