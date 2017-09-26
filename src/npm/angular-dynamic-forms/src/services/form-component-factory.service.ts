import { Injectable, Type } from '@angular/core';
import { FormGroupComponent } from '../components/form-group.component';
import { AbstractFormComponent } from '../components/abstract-form.component';
import { FormInputTextComponent } from '../components/form-input-text.component';
import { FormComponentModel } from '../models/form-component.model';
import { PropertyMetadataModel } from '../models/metadata-models';

export type ResolveComponentTypeFn = (metadata: PropertyMetadataModel) => Type<AbstractFormComponent>|null;

/**
 * Injectable factory to create form control metadata
 */
@Injectable()
export class FormComponentFactoryService {

    private readonly componentResolvers: ResolveComponentTypeFn[];

    /**
     * constructor
     * @param typeConvertService
     */
    constructor() {
        this.componentResolvers = [];
        this.registerTypeName('string', FormInputTextComponent);
    }

    registerTypeName(typeName: string, type: Type<AbstractFormComponent>): void {
        this.registerPredicate(p => p.typeName === typeName, type);
    }

    registerPredicate(predicate: (p: PropertyMetadataModel) => boolean, type: Type<AbstractFormComponent>): void {
        this.registerComponentResolver(p => {
            if (predicate(p)) {
                return type;
            }
            return null;
        });
    }

    registerComponentResolver(resolver: ResolveComponentTypeFn): void {
        this.componentResolvers.push(resolver);
    }

    /**
     * Create form group metadata from metadata information retrieved from the server
     * @param typeMetadataModel
     */
    getFormComponentModel(property: PropertyMetadataModel): FormComponentModel {

        if (property.type) {
            return new FormComponentModel(property.type, FormGroupComponent);
        }

        for (let i = this.componentResolvers.length - 1; i >= 0; i--) {
            const type = this.componentResolvers[i](property);
            if (type !== null) {
                return new FormComponentModel(property, type);
            }
        }
        throw `Cannot resolve component type for property with metadata: ${JSON.stringify(property)}.`;
    }
}
