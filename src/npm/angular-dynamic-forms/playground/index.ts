/**
 * This is only for local test
 */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Component } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AngularDynamicFormsModule }  from '@code-art/angular-dynamic-forms';

@Component({
  selector: 'app',
  template: `<form-group></form-group>`
})
class AppComponent {}

@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [ AppComponent ],
  imports: [ BrowserModule, AngularDynamicFormsModule ]
})
class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);
