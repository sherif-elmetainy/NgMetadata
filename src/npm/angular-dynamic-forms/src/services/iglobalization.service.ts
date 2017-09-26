import { InjectionToken } from '@angular/core';


/**
 * Used to provide a {@link IGlobalizationService}.
 */
// ReSharper disable once InconsistentNaming
export const SPA_METADATA_GLOBALIZATION_SERVICE = new InjectionToken<IGlobalizationService>('SpaMetadataGlobalizationService');

/**
 * Interface for number and date formatting and parsing.
 * This can be provided via Angular dependency injection.
 * In none is provided, a default one is used.
 */
export interface IGlobalizationService {

    /**
     * Parses a date string
     * @param val - Date String to parse
     * @returns {} The parsed dated string or null if val is null.
     */
    parseShortDate: (val: string | null) => Date | null;

    /**
     * Converts a date to a short date string
     * @param val - Date to convert
     * @returns {} The converted date.
     */
    toShortDate: (val: Date | null) => string | null;

    /**
     * Parses a number 
     * @param val - String to parse
     * @returns {} The parsed number, or null if val is null, or NaN if val is not a valid number.
     */
    parseNumber: (val: string | null) => number | null;

    /**
     * Converts a number to string
     * @param val - Number to convert
     * @returns {} String representing the number.
     */
    formatNumber: (val: number | null) => string | null;
};
