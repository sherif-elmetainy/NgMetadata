import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Inject, InjectionToken } from '@angular/core';

import { TypeMetadataModel } from '../models/metadata-models';
import { ICultureService, SPA_METADATA_CULTURE_SERVICE } from './current-culture.service';

// ReSharper disable once InconsistentNaming
export const SPA_METADATA_BASE_URL = new InjectionToken<string>('SpaMetadataBaseUrl');

/**
 * An injectable service to retrieve form metadata
 */
@Injectable()
export class MetadataService {

    /**
     * Constructor. initialize a new instance of MetadataService class.
     * @param httpClient - HTTP client to retrieve the metadata from the server.
     * @param formMetadataFactory - Factory class to create form metadata.
     * @param metadataUrl - URL for the SpaMetadataMiddleware to read data from.
     */
    constructor(private readonly httpClient: HttpClient,
        @Inject(SPA_METADATA_BASE_URL) private readonly metadataUrl: string,
        @Inject(SPA_METADATA_CULTURE_SERVICE) private readonly cultureService: ICultureService
        ) {
    }

    /**
     * Retrieves form group meta data for a model represented by Key. In the server side application startup class,
     * Add the models to the SpaMetadataOptions.AllowedTypes dictionary, and this will allow the SpaMetadataMiddleware
     * to return metadata for that model.
     * @param key - The key for the model as added in SpaMetadataOptions.AllowedTypes
     */
    getMetadata(key: string): Observable<TypeMetadataModel> {
        return this.cultureService.cultureObservable.mergeMap(c => {
            return this.httpClient.get<TypeMetadataModel>(`${this.metadataUrl}/${key}`,
                { headers: new HttpHeaders().set('Accept-Language', c)} );
        });
    }
}
