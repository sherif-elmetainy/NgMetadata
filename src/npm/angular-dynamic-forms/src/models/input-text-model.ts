import { Injector, Type } from '@angular/core';
import { FormControl, AbstractControl } from '@angular/forms';

import { AbstractInputModel } from './abstract-input-model';
import { PropertyMetadataModel, BaseMetadataModel } from './metadata-models';
import { FormInputTextComponent } from '../components/form-input-text.component';
import { AbstractFormComponent } from '../components/abstract-form.component';
import { FormMultilineComponent } from '../components/form-multiline.component';

export class InputTextModel extends AbstractInputModel {
    private val: string;
    constructor(propertyMetadata: PropertyMetadataModel, injector: Injector) {
        super(propertyMetadata, injector);
    }

    get inputType(): string {
        if (this.propertyMetadata.additionalData) {
            if (this.propertyMetadata.additionalData['password'])
                return 'password';
        }
        return 'text';    
    }

    get isMultiline(): boolean {
        if (this.propertyMetadata.additionalData) {
            if (this.propertyMetadata.additionalData['multiline'])
                return true;
        }
        return false;    
    }
    
    get value(): any {
        if (this.control !== null) {
            return this.typeConverterService.convertToString(this.control.value);
        }
        return this.val;
    }

    set value(newVal: any) {
        this.val = newVal;
        if (this.control !== null) {
            this.control.setValue(this.typeConverterService.convertToString(this.val));
        }
    }

    get componentType(): Type<AbstractFormComponent> {
        return this.isMultiline ? FormMultilineComponent : FormInputTextComponent;
    }

    protected createFormControl(): AbstractControl {
        return new FormControl(this.typeConverterService.convertToString(this.val), this.createValidators());
    }

    applyChanges(metadata: BaseMetadataModel) : void {
        super.applyChanges(metadata);
        if (this.propertyMetadata.additionalData['password'] !== metadata.additionalData['password']) {
            throw `Failed to apply changes to property metadata since password property additional metadata changed.`;
        }
        if (this.propertyMetadata.additionalData['multiline'] !== metadata.additionalData['multiline']) {
            throw `Failed to apply changes to property metadata since multiline property additional metadata changed.`;
        }
    }
}