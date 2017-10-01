import { Input } from '@angular/core';
import { AbstractFormModel } from '../models/abstract-form-model';

/**
 * Base class form form metadata
 */
export abstract class AbstractFormComponent {

    @Input() model: AbstractFormModel;

    protected constructor() {
    }
}
