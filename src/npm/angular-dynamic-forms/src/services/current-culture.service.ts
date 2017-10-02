import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Observable } from 'rxjs/Observable';
import { InjectionToken, Inject } from '@angular/core';


// ReSharper disable once InconsistentNaming
export const SPA_METADATA_SUPPORTED_CULTURES = new InjectionToken<string[]>('SpaMetadataSupportedCultures');
// ReSharper disable once InconsistentNaming
export const SPA_METADATA_CULTURE_SERVICE = new InjectionToken<ICultureService>('SpaMetadataCultureService');

export interface ICultureService {
    currentCulture: string;
    cultureObservable: Observable<string>;
}

export class CurrentCultureService implements ICultureService {
	constructor(@Inject(SPA_METADATA_SUPPORTED_CULTURES) private readonly supportedCultures: string[]) {
	    if (supportedCultures === null || supportedCultures === undefined) {
	        throw 'Parameter supportedCultures passed to CurrentCultureService constructor cannot be null.';
        }
        if (supportedCultures.length === 0) {
            throw 'Parameter supportedCultures passed to CurrentCultureService constructor cannot be empty.';
        }
        const index = supportedCultures.findIndex(v => v === null || v === undefined || v === '');
		if (index > 0) {
		    throw `Parameter supportedCultures passed to CurrentCultureService constructor cannot contain empty values. Empty value found at index:${index}.`;
        }
        this.cultureSubject = new ReplaySubject<string>(1);
        this.cultureObservable = this.cultureSubject.asObservable();
	    this.currentCulture = this.getSupportedCulture();
    }

    private readonly cultureSubject: ReplaySubject<string>;
    private culture: string;
    readonly cultureObservable: Observable<string>;
    get currentCulture(): string {
        if (this.culture) {
            return this.culture;
        }
        return this.getSupportedCulture();
    }

	set currentCulture(val: string) {
        if (!val) {
            val = this.getSupportedCulture();
        }
        if (val !== this.culture) {
            this.culture = val;
            this.cultureSubject.next(val);
        }
	}

	private getSupportedCulture(): string {
        const navCulture = this.getNavigatorCulture();
        let index = this.supportedCultures.findIndex(v => CurrentCultureService.areEqual(v, navCulture));
		if (index < 0) {
            index = this.supportedCultures.findIndex(v => CurrentCultureService.isParent(v, navCulture));
        }
	    if (index < 0) {
	        index = this.supportedCultures.findIndex(v => CurrentCultureService.isParent(navCulture, v));
        }
	    if (index < 0) {
	        index = this.supportedCultures.findIndex(v => CurrentCultureService.sameParent(navCulture, v));
	        
        }
	    if (index < 0) {
	        index = 0;
	    }
	    return this.supportedCultures[index];
	}

	private static areEqual(c1: string, c2: string): boolean {
	    if (c2 === null) {
	        return c1 === null || c1 === undefined || c1 === '';
	    }
	    if (c1 === null || c1 === undefined || c1 === '') {
	        return true;
	    }
	    c1 = c1.toLowerCase();
	    c2 = c2.toLowerCase();
        if (c1 === c2) {
            return true;
        }
	    return false;
	}

    private static sameParent(c1: string, c2: string): boolean {
		if (CurrentCultureService.areEqual(c1, c2)) {
            return true;
        }
        const hyphen1Index = c1.indexOf('-');
        const hyphen2Index = c2.indexOf('-');
        return hyphen1Index > 0 &&
            hyphen2Index > 0 &&
            c1.substr(0, hyphen1Index).toLowerCase() === c2.substr(0, hyphen2Index).toLowerCase();
    }

    private static isParent(c1: string, c2: string):boolean {
        if (CurrentCultureService.areEqual(c1, c2)) {
            return true;
        }
        const hyphenIndex = c2.indexOf('-');
		if (hyphenIndex < 0) {
            return c1 === c2.substr(0, hyphenIndex);
        }
        return false;
	}

	private getNavigatorCulture() : string|null {
	    if (typeof navigator !== 'undefined') {
	        const languages = navigator['languages'];
	        if (languages && languages.length > 0 && languages[0])
                return languages[0];
	        else if (navigator.language)
                return navigator.language;
	        else if (navigator['browserLanguage'])
	           return navigator['browserLanguage'];
        }
        return null;
	}
}
