import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/startWith';

import { Component } from '@angular/core';

import { AbstractInputComponent } from './abstract-input.component';
import { AbstractControl, FormControl } from '@angular/forms';

/**
 * A form control that is not displayed. But it holds the value unchanged and value can be changed programatically.
 */
@Component({
    templateUrl: './form-input-hidden.component.html'
})
export class FormInputHiddenComponent extends AbstractInputComponent {

    /** @inheritdoc */
    value: any;

    /** @inheritdoc */
    createFormControl(): Observable<AbstractControl> {
        const control = new FormControl(this.value);
        return new Subject<AbstractControl>().startWith(control);
    }
}
