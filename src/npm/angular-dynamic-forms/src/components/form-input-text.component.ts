import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/startWith';

import { AbstractControl, FormControl } from '@angular/forms';
import { Component } from '@angular/core';

import { TypeConverterService } from '../services/type-converter.service';
import { AbstractInputComponent } from './abstract-input.component';
import { BaseMetadataModel, PropertyMetadataModel } from '../models/metadata-models';

/**
 * A form control for text input
 */
@Component({
    templateUrl: './form-input-text.component.html'
})
export class FormInputTextComponent extends AbstractInputComponent {
    /** @inheritdoc */
    value: any;

    constructor (typeConvertService: TypeConverterService) {
        super(typeConvertService);
    }

    /** @inheritdoc */
    createFormControl(metadata: BaseMetadataModel): Observable<AbstractControl> {
        const propertyMetadata = metadata as PropertyMetadataModel;
        const control = new FormControl(this.typeConverterService.convertToString(this.value), this.createValidators(propertyMetadata));
        return new ReplaySubject<AbstractControl>(1).startWith(control).first();
    }
}
