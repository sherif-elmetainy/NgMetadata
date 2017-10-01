import { Injector } from '@angular/core';
import { ValidatorFn, AbstractControl } from '@angular/forms';

import { AbstractFormModel } from './abstract-form-model';
import { PropertyMetadataModel } from './metadata-models';
import {TypeConverterService} from '../services/type-converter.service';

export abstract class AbstractInputModel extends AbstractFormModel {
    private typeConverterServiceInternal: TypeConverterService | null;

    protected constructor(public readonly propertyMetadata: PropertyMetadataModel, injector: Injector) {
        super(propertyMetadata, injector);
        this.typeConverterServiceInternal = null;
    }

    protected get typeConverterService(): TypeConverterService {
        if (this.typeConverterServiceInternal === null) {
            this.typeConverterServiceInternal = this.injector.get(TypeConverterService);
        }
        return this.typeConverterServiceInternal;
    }

    /**
     * Create the validators for this control
     */
    protected createValidators(): ValidatorFn[] {
        const vals: ValidatorFn[] = [];
        if (!this.metadata) {
            return vals;
        }
        if (!this.propertyMetadata.validationData) {
            return vals;
        }

        this.pushValidatorFn(vals, 'required', null);
        this.pushValidatorFn(vals, 'regex', this.regexVal);
        this.pushValidatorFn(vals, 'length', this.lengthVal);
        this.pushValidatorFn(vals, 'range', this.rangeVal);
        this.pushValidatorFn(vals, 'number', this.numberVal);
        this.pushValidatorFn(vals, 'url', this.urlVal);
        this.pushValidatorFn(vals, 'email', this.emailVal);

        return vals;
    }

    /**
     * Regular expression validation function
     * @param val
     */
    private regexVal(val: any): boolean {
        if (typeof val === 'string') {
            const rex = new RegExp(this.propertyMetadata.validationData['regex-patten']);
            return rex.test(val);
        }
        return true;
    }

    /**
    * Url validation function
    * @param val
    */
    private urlVal(val: any): boolean {
        if (typeof val === 'string') {
            // tslint:disable-next-line 
            const rx = /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/;
            return rx.test(val);

        }
        return false;
    }

    /**
    * Email validation function
    * @param val
    */
    private emailVal(val: any): boolean {
        if (typeof val === 'string') {
            const rx =
                /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
            return rx.test(val);
        }
        return false;
    }

    /**
     * Number validation function
     * @param val
     */
    private numberVal(val: any): boolean {
        const num = this.typeConverterService.convertToNumber(val) as number;
        if (isNaN(num)) {
            return false;
        }
        return true;
    }

    /**
    * Range validation function
    * @param val
    */
    private rangeVal(val: any): boolean {
        const num = this.typeConverterService.convertToNumber(val) as number;
        if (isNaN(num)) {
            return false;
        }
        const rangeMax = this.propertyMetadata.validationData['range-max'];
        if (rangeMax != null) {
            const max = this.typeConverterService.convertToNumber(rangeMax) as number;
            if (!isNaN(max) && num > max) {
                return false;
            }
        }
        const rangeMin = this.propertyMetadata.validationData['range-min'];
        if (rangeMin != null) {
            const min = this.typeConverterService.convertToNumber(rangeMin) as number;
            if (!isNaN(min) && num < min) {
                return false;
            }
        }
        return true;
    }

    /**
     * String or array length validation function.
     * @param val
     */
    private lengthVal(val: any): boolean {
        let length: number;
        if (typeof val === 'string') {
            length = val.length;
        } else if (Array.isArray(val)) {
            length = val.length;
        } else {
            return true;
        }
        const lengthMax = this.propertyMetadata.validationData['length-max'];
        if (lengthMax != null) {
            const max = parseInt(lengthMax, 10);
            if (!isNaN(max) && length > max) {
                return false;
            }
        }
        const lengthMin = this.propertyMetadata.validationData['length-min'];
        if (lengthMin != null) {
            const min = parseInt(lengthMin, 10);
            if (!isNaN(min) && length < min) {
                return false;
            }
        }
        return true;
    }

    /**
     * Whether the control has value
     * @param val
     */
    private isEmpty(val: any) {
        if (val === undefined || val === null || val === '') {
            return true;
        }
        if (typeof val === 'string') {
            let strVal = val as string;
            strVal = strVal.trim();
            if (strVal.length === 0) {
                return true;
            }
        } else if (Array.isArray(val)) {
            return val.length === 0;
        }
        return false;
    }

    /**
     * Add a validation function to the validators list
     * @param vals
     * @param key
     * @param validationFunction
     */
    private pushValidatorFn(vals: ValidatorFn[], key: string, validationFunction: ((v: any) => boolean) | null) {
        const fn = this.createValdiatorFn(key, validationFunction);
        if (fn !== null) {
            vals.push(fn);
        }
    }

    /**
     * Creates an Angular validation function that performs validation and returns the error message
     * returned from the server in case validation is invalid.
     * @param key
     * @param validationFunction
     */
    private createValdiatorFn(key: string, validationFunction: ((v: any) => boolean) | null): ValidatorFn | null {
        const message = this.propertyMetadata.validationData[key];
        if (message == null) {
            return null;
        }
        return (c: AbstractControl) => {
            const val = c.value;
            if (this.isEmpty(val)) {
                if (key === 'required') {
                    return { key: message };
                } else {
                    return null;
                }
            }
            if (validationFunction !== null) {
                if (!validationFunction.apply(this, [val])) {
                    return { key: message };
                }
            }
            return null;
        };
    }

}