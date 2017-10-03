import { Injector, Type } from '@angular/core';
import { AbstractControl, FormArray, ValidatorFn, ValidationErrors } from '@angular/forms';

import { AbstractInputModel } from './abstract-input.model';
import { PropertyMetadataModel } from './metadata-models';
import { AbstractFormModel } from './abstract-form.model';
import { FormComponentFactoryService } from '../services/form-component-factory.service';
import { AbstractFormComponent } from '../components/abstract-form.component';
import { BaseMetadataModel } from './metadata-models';
import {ArrayComponent} from '../components/array.component';


export class ArrayModel extends AbstractInputModel {
    private formControlCreated: boolean;
    private readonly formFactoryService: FormComponentFactoryService;
    private val: any[];
    private elementMetadata: PropertyMetadataModel;
    readonly formModels: AbstractFormModel[];

    constructor(propertyMetadata: PropertyMetadataModel, injector: Injector) {
        super(propertyMetadata, injector);
        if (!propertyMetadata.elementMetadata) {
            throw 'elementMetadata for ArrayModel not set.';
        }
        this.formModels = [];
        this.formControlCreated = false;
        this.formFactoryService = injector.get(FormComponentFactoryService);
        this.elementMetadata = propertyMetadata.elementMetadata;
    }

    protected createFormControl(): AbstractControl {
        const a: AbstractControl[] = [];
        for (let i = 0; i < this.formModels.length; i++) {
            a.push(this.formModels[i].control);
        }
        this.formControlCreated = true;
        return new FormArray(a, this.createConsolidatedValidator());
    }

    private createConsolidatedValidator(): ValidatorFn|null {
        const validators = this.createValidators();
        if (!validators || validators.length === 0) {
            return null;
        }
        return c => {
            const errors: ValidationErrors = {};
            for (let i = 0; i < validators.length; i++) {
                const e = validators[i](c);
                if (e) {
                    for (let k in e) {
                        if (e.hasOwnProperty(k)) {
                            errors[k] = e[k];
                        }
                    }
                }
            }
            return errors;
        }
    }

    get value(): any {
        const res: any[] = [];
        for (let i = 0; i < this.formModels.length; i++) {
            res.push(this.formModels[i].value);
        }
        return res;
    }

    set value(newVal: any) {
        if (newVal === null || newVal === undefined) {
            newVal = [];
        }
        if (!Array.isArray(newVal)) {
            throw 'Array model value must be an array.';
        }
        this.val = newVal;
        const formArray = this.formControlCreated ? this.control as FormArray : null;
        if (this.formModels.length > newVal.length) {
            this.formModels.splice(newVal.length, this.formModels.length);
            if (formArray) {
                while (this.formModels.length < formArray.length) {
                    formArray.removeAt(this.formModels.length);
                }
            }
        }
        for (let i = 0; i < newVal.length; i++) {
            let model: AbstractFormModel;
            if (this.formModels.length <= i) {
                model = this.formFactoryService.getFormComponentModel(this.elementMetadata);
                this.formModels.push(model);
                if (formArray) {
                    formArray.insert(formArray.length, model.control);
                }
            } else {
                model = this.formModels[i];
            }
            model.value = newVal[i];
        }
    }

    get componentType(): Type<AbstractFormComponent> { return ArrayComponent; }

    applyChanges(metadata: BaseMetadataModel) {
        super.applyChanges(metadata);
        const propertyMetadata = metadata as PropertyMetadataModel;
        if (!propertyMetadata.elementMetadata) {
            throw 'applyChanges: elementMetadata for ArrayModel not set.';
        }
        this.elementMetadata = propertyMetadata.elementMetadata;
        for (let i = 0; i < this.formModels.length; i++) {
            this.formModels[i].applyChanges(propertyMetadata.elementMetadata);
        }
    }

    add():void {
        const newModel = this.formFactoryService.getFormComponentModel(this.elementMetadata);
        (this.control as FormArray).insert(this.formModels.length, newModel.control);
        this.formModels.push(newModel);
    }

    remove(model: AbstractFormModel): void {
        const index = this.formModels.indexOf(model);
        if (index < 0) {
            return;
        }
        this.formModels.splice(index, 1);
        (this.control as FormArray).removeAt(index);
    }

    up(model: AbstractFormModel): void {
        const index = this.formModels.indexOf(model);
        if (index <= 0) {
            return;
        }
        this.swapItems(index, index - 1);
    }

    down(model: AbstractFormModel): void {
        const index = this.formModels.indexOf(model);
        if (index < 0 || index >= this.formModels.length -1) {
            return;
        }
        this.swapItems(index, index + 1);
    } 

    top(model: AbstractFormModel): void {
        const index = this.formModels.indexOf(model);
        if (index <= 0) {
            return;
        }
        const temp = this.formModels[index].value;
        for (let i = index; i >= 1; i--) {
            this.formModels[i].value = this.formModels[i - 1].value;
        }
        this.formModels[0].value = temp;
    }

    bottom(model: AbstractFormModel): void {
        const index = this.formModels.indexOf(model);
        if (index < 0 || index >= this.formModels.length - 1) {
            return;
        }
        const temp = this.formModels[index].value;
        for (let i = index; i < this.formModels.length - 1; i++) {
            this.formModels[i].value = this.formModels[i + 1].value;
        }
        this.formModels[this.formModels.length - 1].value = temp;
    }

    private swapItems(i: number, j: number): void {
        const temp = this.formModels[i].value;
        this.formModels[i].value = this.formModels[j].value;
        this.formModels[j].value = temp;
    }
}
