import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';

import { TypeMetadataModel } from '../models/metadata-models';
import { AbstractControl, FormGroup } from '@angular/forms';
import { AbstractFormComponent } from './abstract-form.component';
import { MetadataService } from '../services/metadata.service';
import { FormComponentModel } from '../models/form-component.model';
import { FormComponentFactoryService } from '../services/form-component-factory.service';
import { BaseMetadataModel } from '../models/metadata-models';


/**
 * A form control metadata representing a group of controls
 */
@Component({
    selector: 'form-group',
    templateUrl: './form-group.component.html'
})
export class FormGroupComponent extends AbstractFormComponent {

    private readonly typeMetadataObservable: Observable<TypeMetadataModel>;
    /**
     * Controls contained in the group.
     */
    readonly formComponentModels: FormComponentModel[];
    groups: { [group: string]: FormComponentModel[] };
    groupKeys: string[];


    /**
     * Constructor. 
     * @param typeMetadata
     * @param typeConverterService
     */
    constructor(private readonly metadataService: MetadataService, private readonly componentFactory: FormComponentFactoryService ) {
        super();
        this.formComponentModels = [];
        this.typeMetadataObservable = this.metadata.map(v => v as TypeMetadataModel);
    }

    private initGroups(): void {
        const groups: { [group: string]: FormComponentModel[] } = {};
        const groupKeys: string[] = [];
        for (let i = 0; i < this.formComponentModels.length; i++) {
            const model = this.formComponentModels[i];
            const group = model.metadata.additionalData ? (model.metadata.additionalData['group']) || '' : '';
            if (!groups[group]) {
                groups[group] = [] as FormComponentModel[];
                groupKeys.push(group);
            }
            groups[group].push(model);
        }

        for (const group in groups) {
            if (groups.hasOwnProperty(group)) {
                groups[group].sort((a, b) => (a.metadata.order || 0) - (b.metadata.order || 0));
            }
        }
        this.groupKeys = groupKeys;
        this.groups = groups;
    }

    /** @inheritdoc */
    protected createFormControl(metadata: BaseMetadataModel): Observable<AbstractControl> {
        const typeMetadata = metadata as TypeMetadataModel;
        const group: { [key: string]: AbstractControl } = {};
        const formSubject = new ReplaySubject<AbstractControl>(1);
        let remainingCount = typeMetadata.properties.length;
        for (let i = 0; i < typeMetadata.properties.length; i++) {
            const componentModel = this.componentFactory.getFormComponentModel(typeMetadata.properties[i]);
            this.formComponentModels.push(componentModel);
            componentModel.control.first().subscribe(c => {
                group[componentModel.metadata.name] = c;
                if (--remainingCount === 0) {
                    formSubject.next(new FormGroup(group));
                    formSubject.complete();
                }
            });
        }

        this.initGroups();
        return formSubject.asObservable();
    }

    /** @inheritdoc */
    get value(): any {
        return null;
    }

    /** @inheritdoc */
    set value(newVal: any) {
    }
}
