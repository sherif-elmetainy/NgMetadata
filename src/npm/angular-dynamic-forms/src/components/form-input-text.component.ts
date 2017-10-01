import { Component } from '@angular/core';

import { AbstractFormComponent } from './abstract-form.component';

/**
 * A form control for text input
 */
@Component({
    templateUrl: './form-input-text.component.html'
})
export class FormInputTextComponent extends AbstractFormComponent {
    cssClassName: string;
    constructor () {
        super();
        this.cssClassName = 'form-control';
    }
}
