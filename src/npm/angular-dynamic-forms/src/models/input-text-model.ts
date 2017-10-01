import { Injector, Type } from '@angular/core';
import { FormControl, AbstractControl } from '@angular/forms';

import { AbstractInputModel } from './abstract-input-model';
import { PropertyMetadataModel } from './metadata-models';
import { FormInputTextComponent } from '../components/form-input-text.component';
import { AbstractFormComponent } from 'components/abstract-form.component';

export class InputTextModel extends AbstractInputModel {
    constructor(propertyMetadata: PropertyMetadataModel, injector: Injector) {
        super(propertyMetadata, injector);
    }

    private val: any;

    get value(): any {
        if (this.control !== null) {
            return this.typeConverterService.convertToString(this.control.value);
        }
        return this.val;
    }

    get componentType(): Type<AbstractFormComponent> {
        return FormInputTextComponent;
    }

    set value(newVal: any) {
        this.val = newVal;
        if (this.control !== null) {
            this.control.setValue(this.typeConverterService.convertToString(this.val));
        }
    }

    protected createFormControl(): AbstractControl {
        return new FormControl(this.typeConverterService.convertToString(this.val), this.createValidators());
    }
}