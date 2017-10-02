import { NgModule } from '@angular/core';

import { TypeConverterService, SPA_METADATA_TYPE_CONVERTER_SERVICE } from '../services/type-converter.service';
import { SPA_METADATA_GLOBALIZATION_SERVICE } from '../services/iglobalization.service';
import { DefaultGlobalizationService, globalizeStatic, SPA_METADATA_GLOBALIZE_STATIC } from '../services/default-globalization-service';
import { SPA_METADATA_BASE_URL, MetadataService } from '../services/metadata.service';
import { SPA_METADATA_CULTURE_SERVICE, SPA_METADATA_SUPPORTED_CULTURES, CurrentCultureService } from '../services/current-culture.service';
import { FormComponentFactoryService } from '../services/form-component-factory.service';

@NgModule({
    providers: [
        FormComponentFactoryService,
        MetadataService,
        { provide: SPA_METADATA_TYPE_CONVERTER_SERVICE, useClass: TypeConverterService },
        { provide: SPA_METADATA_GLOBALIZATION_SERVICE, useClass: DefaultGlobalizationService },
        { provide: SPA_METADATA_BASE_URL, useValue: '/metadata' },
        { provide: SPA_METADATA_CULTURE_SERVICE, useClass: CurrentCultureService },
        { provide: SPA_METADATA_SUPPORTED_CULTURES, useValue: ['en'] },
        { provide: SPA_METADATA_GLOBALIZE_STATIC, useValue: globalizeStatic }
    ]
})
export class AngularDynamicFormsServicesModule {

}
