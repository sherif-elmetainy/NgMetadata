import { AbstractControl, FormGroup } from '@angular/forms';
import { Injector, Type } from '@angular/core';

import { AbstractFormModel } from './abstract-form.model';
import { AbstractFormComponent } from '../components/abstract-form.component';
import { FormGroupComponent } from '../components/form-group.component';
import { TypeMetadataModel, BaseMetadataModel } from './metadata-models';
import { FormComponentFactoryService } from '../services/form-component-factory.service';

export class FormGroupModel extends AbstractFormModel {
    private readonly formFactoryService: FormComponentFactoryService;
    readonly properties: AbstractFormModel[];

    constructor(private readonly typeMetadataModel: TypeMetadataModel, injector: Injector) {
        super(typeMetadataModel, injector);
        this.formFactoryService = injector.get(FormComponentFactoryService);
        this.properties = [];

        for (let i = 0; i < this.typeMetadataModel.properties.length; i++) {
            this.properties.push(this.formFactoryService.getFormComponentModel(this.typeMetadataModel.properties[i]));
        }
    }

    createFormControl(): AbstractControl {
        const group: { [key: string]: AbstractControl } = {};

        this.properties.forEach(fi => {
            group[fi.metadata.key] = fi.control;
        });

        return new FormGroup(group);
    }

    private val: any;

    get value(): any {
        const res: { [key: string]: any } = {};
        for (let i = 0; i < this.properties.length; i++) {
            res[this.properties[i].metadata.key] = this.properties[i].value;
        }
        return res;
    }

    set value(newVal: any) {
        this.val = newVal || {};
        for (let i = 0; i < this.properties.length; i++) {
            this.properties[i].value = newVal[this.properties[i].metadata.key];
        }
    }

    get componentType(): Type<AbstractFormComponent> { return FormGroupComponent }

    applyChanges(metadata: BaseMetadataModel): void {
        super.applyChanges(metadata);
        const typeMetadata = metadata as TypeMetadataModel;
        if (typeMetadata.properties.length !== this.properties.length) {
            throw `Failed to apply changes to from group model. Propery length mitmatch. Old length ${this.properties.length} and new length ${this.properties.length}.`;
        }
        for (let i = 0; i < typeMetadata.properties.length; i++) {
            if (this.properties[i] instanceof FormGroupModel) {
                this.properties[i].applyChanges(typeMetadata.properties[i].type);
            } else {
                this.properties[i].applyChanges(typeMetadata.properties[i]);
            }
        }
    }
}