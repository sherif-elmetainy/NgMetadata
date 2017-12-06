import { Injectable, Injector } from '@angular/core';

import { PropertyMetadataModel } from '../models/metadata-models';
import { AbstractFormModel } from '../models/abstract-form.model';
import { FormGroupModel } from '../models/form-group.model';
import { InputTextModel } from '../models/input-text.model';
import { NumericModel } from '../models/numeric.model';
import { IntegerModel } from '../models/integer.model';
import { ArrayModel } from '../models/array.model';

export type FormModelFactory = (metadata: PropertyMetadataModel, injector: Injector, parent: FormGroupModel) => AbstractFormModel;
export type ResolveFormModelFn = (metadata: PropertyMetadataModel) => FormModelFactory;

/**
 * Injectable factory to create form control metadata
 */
@Injectable()
export class FormComponentFactoryService {

    private readonly modelResolvers: ResolveFormModelFn[];

    /**
     * constructor
     * @param typeConvertService
     */
    constructor(private readonly injector: Injector) {
        this.modelResolvers = [];
        this.registerTypeName('string', (props, inj, parent) => new InputTextModel(props, inj, parent));
        this.registerTypeName('number', (props, inj, parent) => new NumericModel(props, inj, parent));
        this.registerTypeName('int', (props, inj, parent) => new IntegerModel(props, inj, parent));
    }

    registerTypeName(typeName: string, factory: FormModelFactory): void {
        this.registerPredicate(p => p.typeName === typeName, factory);
    }

    registerPredicate(predicate: (p: PropertyMetadataModel) => boolean, factory: FormModelFactory): void {
        this.registerComponentResolver(p => {
            if (predicate(p)) {
                return factory;
            }
            return null;
        });
    }

    registerComponentResolver(resolver: ResolveFormModelFn): void {
        this.modelResolvers.push(resolver);
    }

    /**
     * Create form group metadata from metadata information retrieved from the server
     * @param typeMetadataModel
     */
    getFormComponentModel(property: PropertyMetadataModel, parent: FormGroupModel): AbstractFormModel {
        if (property.type) {
            return new FormGroupModel(property.type, this.injector, parent);
        }
        if (property.isCollection) {
            return new ArrayModel(property, this.injector, parent);
        }

        for (let i = this.modelResolvers.length - 1; i >= 0; i--) {
            const factory = this.modelResolvers[i](property);
            if (factory !== null) {
                return factory(property, this.injector, parent);
            }
        }
        throw `Cannot resolve component type for property with metadata: ${JSON.stringify(property)}.`;
    }
}
