import { Component, OnInit, Input, Injector } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';


import { AbstractFormComponent } from './abstract-form.component';
import { MetadataService } from '../services/metadata.service';
import { AbstractFormModel } from '../models/abstract-form-model';
import { FormGroupModel } from '../models/form-group-model';


/**
 * A form control metadata representing a group of controls
 */
@Component({
    selector: 'form-group',
    templateUrl: './form-group.component.html'
})
export class FormGroupComponent extends AbstractFormComponent implements OnInit {
    private metadataKeyInternal: string;
    private initialized: boolean;
    groups: { [group: string]: AbstractFormModel[] };
    groupKeys: string[];


    @Input() set metadataKey(val: string) {
        this.metadataKeyInternal = val;
        this.metadataService.getMetadata(this.metadataKeyInternal).first().subscribe(m => {
            const model = new FormGroupModel(m, this.injector);
            this.model = model;
            if (this.initialized) {
                this.initGroups();
            }
        });
    };

    get metadataKey(): string {
        return this.metadataKeyInternal;
    }

    get formModel(): FormGroupModel {
        return this.model as FormGroupModel;
    }

    /**
     * Constructor. 
     * @param typeMetadata
     * @param typeConverterService
     */
    constructor(private readonly metadataService: MetadataService, private readonly injector: Injector) {
        super();
        this.initialized = false;
    }

    private initGroups(): void {
        const groups: { [group: string]: AbstractFormModel[] } = {};
        const groupKeys: string[] = [];
        for (let i = 0; i < this.formModel.properties.length; i++) {
            const model = this.formModel.properties[i];
            const group = model.metadata.additionalData ? (model.metadata.additionalData['group']) || '' : '';
            if (!groups[group]) {
                groups[group] = [] as AbstractFormModel[];
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

    ngOnInit(): void {
        this.initialized = true;
        if (this.formModel) {
            this.initGroups();    
        }
    }
}
