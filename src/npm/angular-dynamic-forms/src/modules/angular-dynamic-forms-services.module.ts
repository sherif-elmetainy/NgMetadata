import { NgModule } from '@angular/core';

import { TypeConverterService, SPA_METADATA_TYPE_CONVERTER_SERVICE } from '../services/type-converter.service';
import { SPA_METADATA_GLOBALIZATION_SERVICE } from '../services/iglobalization.service';
import { DefaultGlobalizationService } from '../services/default-globalization-service';
import { SPA_METADATA_BASE_URL, MetadataService } from '../services/metadata.service';
import { FormComponentFactoryService } from '../services/form-component-factory.service';

@NgModule({
    providers: [
        FormComponentFactoryService,
        MetadataService,
        { provide: SPA_METADATA_TYPE_CONVERTER_SERVICE, useClass: TypeConverterService },
        { provide: SPA_METADATA_GLOBALIZATION_SERVICE, useClass: DefaultGlobalizationService },
        { provide: SPA_METADATA_BASE_URL, useValue: '/metadata' }
    ]
})
export class AngularDynamicFormsServicesModule {

}
