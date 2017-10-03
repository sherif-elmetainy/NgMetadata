/**
 * Form metadata form information retrieved from SpaMetadataMiddleware
 */
// ReSharper disable once InconsistentNaming
export interface BaseMetadataModel {
    
    /**
     * key (the name of json serialized property) and the AbstractControl key
     */
    key: string;

    /**
     * Name (the name of the server side property)
     */
    name: string;

    /**
     * Display name
     */
    displayName: string;

    /**
     * Short name
     */
    shortName: string;

    /**
     * Description
     */
    description: string | null;

    /**
     * Additional data
     */
    additionalData: { [key: string]: string };
    /**
    * Display order of the property relative to other properties. Lower number first.
    */
    order: number;
}

/**
 * Property metadata retrieved from SpaMetadataMiddleware
 */
// ReSharper disable once InconsistentNaming
export interface PropertyMetadataModel extends BaseMetadataModel {

    /**
     * Place holder text
     */
    placeHolderText: string;

    /**
     * Validation data. 
     */
    validationData: { [key: string]: string };

    /**
     * Whether the property is a collection
     */
    isCollection: boolean;

    /**
     * Whether the property is an enum
     */
    isEnum: boolean;

    /**
     * Type name (for simple types). When this is null
     */
    typeName: string|null;
    type: TypeMetadataModel | null;

    elementMetadata: PropertyMetadataModel;
}

/**
 * Type metadata retrieved from SpaMetadataMiddleware
 */
// ReSharper disable once InconsistentNaming
export interface TypeMetadataModel extends BaseMetadataModel {
    /**
     * Property collection
     */
    properties: PropertyMetadataModel[];
}
