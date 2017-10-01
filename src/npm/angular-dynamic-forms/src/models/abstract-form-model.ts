import { Injector, Type } from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { BaseMetadataModel } from '../models/metadata-models';
import {AbstractFormComponent} from '../components/abstract-form.component';


export abstract class AbstractFormModel {

    private formControl: AbstractControl;

    protected constructor(public readonly metadata: BaseMetadataModel, protected injector: Injector) {
        
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
}