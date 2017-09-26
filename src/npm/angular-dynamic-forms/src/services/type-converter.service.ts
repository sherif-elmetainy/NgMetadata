import { Injectable, Inject } from '@angular/core';
import { IGlobalizationService, SPA_METADATA_GLOBALIZATION_SERVICE } from './iglobalization.service';

/**
 * injectable service to perform type conversions.
 */
@Injectable()
export class TypeConverterService {

    /**
     * constructor. 
     * @param globalizationService - Injected globalization service (optional). When none is provided by angular, default is used.
     */
    constructor( @Inject(SPA_METADATA_GLOBALIZATION_SERVICE) private readonly globalizationService: IGlobalizationService) {

    }

    /**
     * Convert a value to string
     * @param val
     */
    convertToString(val: any): string|null {
        if (val === null || val === undefined) {
            return '';
        }
        if (typeof val === 'string') {
            return val;
        }
        if (typeof val === 'number') {
            return this.globalizationService.formatNumber(val);
        }
        if (typeof val === 'boolean') {
            return val ? 'true' : 'false';
        }
        if (val instanceof Date) {
            return this.globalizationService.toShortDate(val);
        }
        return val.toString();
    }

    /**
     * converts a value to boolean
     * @param val
     */
    convertToBoolean(val: any): boolean {
        if (val === null || val === undefined) {
            return false;
        }
        if (typeof val === 'boolean') {
            return val;
        }
        if (typeof val === 'number') {
            return val !== 0;
        }
        if (typeof val === 'string') {
            return val !== '0' && /^true$/i.test(val);
        }
        throw `Cannot convert value ${val} of type ${typeof val} to Boolean.`;
    }

    /**
     * Converts a value to a number
     * @param val
     */
    convertToNumber(val: any): number|null {
        if (val === null || val === undefined) {
            return null;
        }
        if (typeof val === 'boolean') {
            return val ? 0 : 1;
        }
        if (typeof val === 'number') {
            return val;
        }
        if (typeof val === 'string') {
            return this.globalizationService.parseNumber(val);
        }
        if (val instanceof Date) {
            return val.valueOf();
        }
        throw `Cannot convert value ${val} of type ${typeof val} to Number.`;
    }

    /**
     * Converts a value to a date
     * @param val
     */
    convertToDate(val: any): Date|null {
        if (val === null || val === undefined) {
            return null;
        }
        if (typeof val === 'number') {
            return new Date(val);
        }
        if (typeof val === 'string') {
            return this.globalizationService.parseShortDate(val);
        }
        if (val instanceof Date) {
            return val;
        }
        throw `Cannot convert value ${val} of type ${typeof val} to Date.`;
    }
}
