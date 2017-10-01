import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';

@Component({
    templateUrl: './example-form.component.html'
})
export class ExampleFormComponent {

    private readonly key: string;

    constructor() {
        this.key = 'ExampleModel';
    }
}