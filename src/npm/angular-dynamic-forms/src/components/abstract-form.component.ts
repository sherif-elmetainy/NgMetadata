import { Input } from '@angular/core';
import { AbstractFormModel } from '../models/abstract-form-model';

/**
 * Base class form form metadata
 */
export abstract class AbstractFormComponent {

    @Input() model: AbstractFormModel;
    
    /**
     * Constuctor. initializes a new instance of AbstractFormMetadata
     * @param metadata - metadata information that was retrieved from the server.
     * @param typeConverterService - A type converter service
     */
    protected constructor() {
    }
}
