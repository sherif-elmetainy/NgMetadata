import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { FormGroupComponent } from '../components/form-group.component';
import { FormInputTextComponent } from '../components/form-input-text.component';
import { FormInputHostComponent } from '../components/form-input-host.component';
import { FormHostDirective } from '../directives/form-host.directive';
import { FormMultilineComponent } from '../components/form-multiline.component';
import { ValidationErrorsComponent } from '../components/validation-errors.component';

import { RemoveHostTagDirective } from '../directives/remove-host-tag.directive';
import { ChangeTagDirective } from '../directives/change-tag.directive';
import { ArrayComponent } from '../components/array.component';

@NgModule({
    declarations: [
        ArrayComponent,
        FormGroupComponent,
        FormInputTextComponent,
        FormInputHostComponent,
        FormMultilineComponent,
        ValidationErrorsComponent,
        FormHostDirective,
        RemoveHostTagDirective,
        ChangeTagDirective
    ],
    imports: [FormsModule, ReactiveFormsModule, CommonModule],
    entryComponents: [FormGroupComponent, FormInputTextComponent, FormMultilineComponent, ArrayComponent ],
    exports: [FormGroupComponent, ValidationErrorsComponent, RemoveHostTagDirective, ChangeTagDirective]
})
export class AngularDynamicFormsModule {

}
