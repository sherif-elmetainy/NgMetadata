import { Injector, Type } from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { InputTextModel } from './input-text.model';
import { PropertyMetadataModel, BaseMetadataModel } from './metadata-models';
import { FormInputTextComponent } from '../components/form-input-text.component';
import { AbstractFormComponent } from '../components/abstract-form.component';
import { FormGroupModel } from './form-group.model';

export class NumericModel extends InputTextModel {
    private numericVal: number | null;
    private lastValueValid: boolean;

    constructor(propertyMetadata: PropertyMetadataModel, injector: Injector, parent: FormGroupModel) {
        super(propertyMetadata, injector, parent);
        this.lastValueValid = false;
    }

    protected createFormControl(): AbstractControl {
        const c = super.createFormControl();
        c.valueChanges.subscribe(n => {
            const v = this.typeConverterService.convertToNumber(n);
            this.lastValueValid = typeof v === 'number';
            if (this.lastValueValid) {
                this.numericVal = v;
            }
        });
        return c;
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
            this.control.setValue(this.typeConverterService.convertToString(this.numericVal));
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

    applyChanges(metadata: BaseMetadataModel): void {
        super.applyChanges(metadata);
        if (this.lastValueValid) {
            if (this.value !== this.numericVal) {
                this.value = this.numericVal;
            }
        }
    }
}