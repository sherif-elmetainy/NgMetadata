import { Injector } from '@angular/core';

import { NumericModel } from './numeric.model';
import { ITypeConverterService, SPA_METADATA_TYPE_CONVERTER_SERVICE } from '../services/type-converter.service';
import { PropertyMetadataModel } from './metadata-models';
import { FormGroupModel } from './form-group.model';

class IntegerTypeConverterService implements ITypeConverterService {

    convertToString(val): string|null {
        return this.innerService.convertToString(val);
    }

    convertToBoolean(val): boolean {
        return this.innerService.convertToBoolean(val);
    }

    convertToNumber(val): number | null {
        const res = this.innerService.convertToNumber(val);
        if (res !== null) {
            if (Math.round(res) !== res) return NaN;
        }
        return res;
    }

    convertToDate(val): Date | null {
        return this.innerService.convertToDate(val);
    }

    constructor(private readonly innerService: ITypeConverterService) {
        if (!innerService) {
            throw 'innerService parameter passed to IntegerTypeConverterService cannot be null or undefined.';
        }
    }
}

export class IntegerModel extends NumericModel {

    constructor(propertyMetadata: PropertyMetadataModel, injector: Injector, parent: FormGroupModel) {
        super(propertyMetadata, injector, parent);
        this.internalService = null;
    }

    private internalService: ITypeConverterService;

    get inputType(): string {
        return 'number';
    }

    protected get typeConverterService(): ITypeConverterService {
        if (!this.internalService) {
            this.internalService = new IntegerTypeConverterService(this.injector.get(SPA_METADATA_TYPE_CONVERTER_SERVICE));
        }
        return this.internalService;
    }
}