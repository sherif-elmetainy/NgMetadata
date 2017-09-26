import { Input, Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'validation-errors',
    templateUrl: './validation-errors.component.html'
})
export class ValidationErrorsComponent {
    @Input() control: FormControl;
    @Input() containerCssClassName: string = 'text-danger';
    @Input() errorCssClassName: string = 'text-danger';

    get hasError(): boolean {
        return this.control != null && this.control.invalid && this.control.touched;
    }

    get errorMessages(): string[] {
        const errors: string[] = [];
        if (this.control == null) {
            return errors;
        }
        const errorsCollection = this.control.errors;
        if (errorsCollection !== null) {
            for (const key in errorsCollection) {
                if (errorsCollection.hasOwnProperty(key)) {
                    const error = errorsCollection[key];
                    if (error !== null) {
                        errors.push(error);
                    }
                }
            }
        }
        return errors;
    }
}
