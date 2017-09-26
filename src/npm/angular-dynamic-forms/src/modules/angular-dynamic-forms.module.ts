import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { FormGroupComponent } from '../components/form-group.component';
import { FormInputHiddenComponent } from '../components/form-input-hidden.component';
import { FormInputTextComponent } from '../components/form-input-text.component';
import { FormInputHostComponent } from '../components/form-input-host.component';
import { FormHostDirective } from '../directives/form-host.directive';
import { ValidationErrorsComponent } from '../components/validation-errors.component';

@NgModule({
    declarations: [
        FormGroupComponent,
        FormInputHiddenComponent,
        FormInputTextComponent,
        FormInputHostComponent,
        FormHostDirective,
        ValidationErrorsComponent
    ],
    imports: [FormsModule, ReactiveFormsModule, CommonModule],
    entryComponents: [FormGroupComponent, FormInputHiddenComponent, FormInputTextComponent],
    exports: [FormGroupComponent, ValidationErrorsComponent]
})
export class AngularDynamicFormsModule {

}
