import 'rxjs/add/operator/startWith';

import { Component } from '@angular/core';

import { AbstractFormComponent } from './abstract-form.component';

/**
 * A form control for text input
 */
@Component({
    templateUrl: './form-multiline.component.html'
})
export class FormMultilineComponent extends AbstractFormComponent {
    cssClassName: string;
    constructor() {
        super();
        this.cssClassName = 'form-control';
    }
}
