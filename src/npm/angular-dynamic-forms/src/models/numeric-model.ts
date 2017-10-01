import { Injector, Type } from '@angular/core';

import { InputTextModel } from './input-text-model';
import { PropertyMetadataModel } from './metadata-models';
import { FormInputTextComponent } from '../components/form-input-text.component';
import { AbstractFormComponent } from '../components/abstract-form.component';

export class NumericModel extends InputTextModel {
    private numericVal: number | null;

    constructor(propertyMetadata: PropertyMetadataModel, injector: Injector) {
        super(propertyMetadata, injector);
    }

    get value(): any {
        if (this.control !== null) {
            return this.typeConverterService.convertToNumber(this.control.value);
        }
        return this.numericVal;
    }

    set value(newVal: any) {
        this.numericVal = this.typeConverterService.convertToNumber(newVal);
        if (this.control !== null) {
            this.control.setValue(this.numericVal);
        }
    }

    get isMultiline(): boolean {
        return false;
    }

    get componentType(): Type<AbstractFormComponent> {
        return FormInputTextComponent;
    }

    get inputType(): string {
        return 'text';
    }
}