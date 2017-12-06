import { Injector, Type } from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { BaseMetadataModel } from '../models/metadata-models';
import { AbstractFormComponent } from '../components/abstract-form.component';
import { FormGroupModel } from './form-group.model';


export abstract class AbstractFormModel {

    private formControl: AbstractControl;

    protected constructor(public readonly metadata: BaseMetadataModel, protected injector: Injector, public readonly parent: FormGroupModel) {
        
    }

    abstract get value(): any;
    abstract set value(newVal: any);

    abstract get componentType(): Type<AbstractFormComponent>;

    protected abstract createFormControl(): AbstractControl;

    get control(): AbstractControl {
        if (!this.formControl) {
            this.formControl = this.createFormControl();
        }
        return this.formControl;
    }

    get hasError(): boolean {
        return this.formControl != null && this.control.invalid && this.control.touched;
    }

    applyChanges(metadata: BaseMetadataModel): void {
        if (!metadata) {
            throw `Cannot apply changes with null metadata.`;
        }
        if (this.metadata.key !== metadata.key || this.metadata.name !== metadata.name) {
            throw `Applying metadata change cause name or key change. Old metadata: ${JSON.stringify(this.metadata)}. New metadata ${JSON.stringify(metadata)}`;
        }
        this.metadata.description = metadata.description;
        this.metadata.shortName = metadata.shortName;
        this.metadata.displayName = metadata.displayName;
        this.metadata.order = metadata.order;
        this.metadata.additionalData = metadata.additionalData;
    }
}
