import { IGlobalizationService } from './iglobalization.service';

/** @internal */
/**
 * Default globalization service used when none is provided via dependency injection
 */
export class DefaultGlobalizationService implements IGlobalizationService {

    /** @inheritDoc */
    parseShortDate(val: string): Date | null {
        if (!val) {
            return null;
        }
        return new Date(val);
    }

    /** @inheritDoc */
    toShortDate(val: Date): string | null {
        if (!val) {
            return null;
        }
        return val.toLocaleString();
    }

    /** @inheritDoc */
    parseNumber(val: string): number | null {
        if (!val) {
            return null;
        }
        return parseFloat(val);
    }

    /** @inheritDoc */
    formatNumber(val: number): string | null {
        if (!val) {
            return null;
        }
        return val.toString();
    }
}
