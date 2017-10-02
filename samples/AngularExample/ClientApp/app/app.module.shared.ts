import { NgModule, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { FetchDataComponent } from './components/fetchdata/fetchdata.component';
import { CounterComponent } from './components/counter/counter.component';
import { ExampleFormComponent } from './components/example-form/example-form.component';

import { AngularDynamicFormsModule, AngularDynamicFormsServicesModule } from '@code-art/angular-dynamic-forms';
import { SPA_METADATA_SUPPORTED_CULTURES, SPA_METADATA_GLOBALIZE_STATIC } from '@code-art/angular-dynamic-forms'

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        CounterComponent,
        FetchDataComponent,
        ExampleFormComponent,
        HomeComponent
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        HttpModule,
        FormsModule,
        AngularDynamicFormsModule,
        AngularDynamicFormsServicesModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'counter', component: CounterComponent },
            { path: 'example-form', component: ExampleFormComponent },
            { path: 'fetch-data', component: FetchDataComponent },
            { path: '**', redirectTo: 'home' }
        ])
    ],
    providers: [
        { provide: SPA_METADATA_SUPPORTED_CULTURES, useValue: ['en-GB', 'de'] }
    ]
})
export class AppModuleShared {
    // ReSharper disable once InconsistentNaming
    constructor( @Inject(SPA_METADATA_GLOBALIZE_STATIC) Globalize: GlobalizeStatic) {
        // ReSharper disable CommonJsExternalModule
        Globalize.load(require('cldr-data/main/en-GB/ca-gregorian.json'));
        Globalize.load(require('cldr-data/main/en-GB/timeZoneNames.json'));
        Globalize.load(require('cldr-data/main/en-GB/numbers.json'));

        Globalize.load(require('cldr-data/main/de/ca-gregorian.json'));
        Globalize.load(require('cldr-data/main/de/timeZoneNames.json'));
        Globalize.load(require('cldr-data/main/de/numbers.json'));
    }
}
