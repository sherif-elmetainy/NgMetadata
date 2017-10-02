import { InjectionToken, Inject } from '@angular/core';

import { IGlobalizationService } from './iglobalization.service';
import { ICultureService, SPA_METADATA_CULTURE_SERVICE} from './current-culture.service';

// ReSharper disable once InconsistentNaming
export const SPA_METADATA_GLOBALIZE_STATIC = new InjectionToken<GlobalizeStatic>('SpaMetadataGlobalizeStatic');

// ReSharper disable once CommonJsExternalModule
// ReSharper disable once InconsistentNaming
export const globalizeStatic = ((Globalize: GlobalizeStatic): GlobalizeStatic => {
// ReSharper disable CommonJsExternalModule
    Globalize.load(require('cldr-data/supplemental/likelySubtags.json'));
    Globalize.load(require('cldr-data/supplemental/timeData.json'));
    Globalize.load(require('cldr-data/supplemental/weekData.json'));
    Globalize.load(require('cldr-data/supplemental/numberingSystems.json'));

    Globalize.load(require('cldr-data/main/en/ca-gregorian.json'));
    Globalize.load(require('cldr-data/main/en/timeZoneNames.json'));
    Globalize.load(require('cldr-data/main/en/numbers.json'));
    return Globalize;

})(require('globalize'));

class GlobalizeDefaults {
    private readonly globalizeInstance: GlobalizeStatic;
    private shortDateParserInternal: (val: string) => Date;
    private shortDateFormatterInternal: (val: Date) => string;
    private numberParserInternal: (val: string) => number;
    private numberFormatterInternal: (val: number) => string;

// ReSharper disable once InconsistentNaming
    constructor(Globalize: GlobalizeStatic, culture: string) {
        this.globalizeInstance = new Globalize(culture);
    }

    get shortDateParser(): (val: string) => Date {
        return this.shortDateParserInternal ||
            (this.shortDateParserInternal = this.globalizeInstance.dateParser({ date: 'short' }));
    }
    get shortDateFormatter(): (val: Date) => string {
        return this.shortDateFormatterInternal ||
            (this.shortDateFormatterInternal = this.globalizeInstance.dateFormatter({ date: 'short' }));
    }

    get numberParser(): (val: string) => number {
        return this.numberParserInternal ||
            (this.numberParserInternal = this.globalizeInstance.numberParser({ style: 'decimal' }));
    }

    get numberFormatter(): (val: number) => string {
        return this.numberFormatterInternal ||
            (this.numberFormatterInternal = this.globalizeInstance.numberFormatter({ style: 'decimal' }));
    }
};

/** @internal */
/**
 * Default globalization service used when none is provided via dependency injection
 */
export class DefaultGlobalizationService implements IGlobalizationService {
    private readonly globalizeInstances: { [key: string]: GlobalizeDefaults };

    constructor( @Inject(SPA_METADATA_GLOBALIZE_STATIC) private readonly globalize: GlobalizeStatic,
        @Inject(SPA_METADATA_CULTURE_SERVICE) private readonly cultureService: ICultureService) {
        this.globalizeInstances = {}    
    }

    private get globalizeInstance(): GlobalizeDefaults {
        const culture = this.cultureService.currentCulture;
        let instance = this.globalizeInstances[culture];
        if (!instance) {
            instance = new GlobalizeDefaults(this.globalize, culture);
            this.globalizeInstances[culture] = instance;
        }
        return instance;
    }

    /** @inheritDoc */
    parseShortDate(val: string): Date | null {
        if (!val) {
            return null;
        }
        return this.globalizeInstance.shortDateParser(val);
    }

    /** @inheritDoc */
    toShortDate(val: Date): string | null {
        if (!val) {
            return null;
        }
        return this.globalizeInstance.shortDateFormatter(val);
    }

    /** @inheritDoc */
    parseNumber(val: string): number | null {
        if (!val) {
            return null;
        }
        return this.globalizeInstance.numberParser(val);
    }

    /** @inheritDoc */
    formatNumber(val: number): string | null {
        if (!val) {
            return null;
        }
        return this.globalizeInstance.numberFormatter(val);
    }
}
