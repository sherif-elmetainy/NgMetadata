import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { Type } from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { BaseMetadataModel } from '../models/metadata-models';
import { AbstractFormComponent } from '../components/abstract-form.component';

export class FormComponentModel {
    private readonly componentSubject: ReplaySubject<AbstractFormComponent>;
    private readonly componentObservable: Observable<AbstractFormComponent>;
    private readonly componentControlObservable: Observable<AbstractControl>;
    private readonly componentControlSubject: ReplaySubject<AbstractControl>;
    private componentSet: boolean;

    constructor(public readonly metadata: BaseMetadataModel, public readonly type: Type<any>) {
        if (this.metadata === null) {
            throw `metadata parameter password to FormComponentModel constructor cannot be null`;
        }
        if (this.type === null) {
            throw `type parameter password to FormComponentModel constructor cannot be null`;
        }

        this.componentSubject = new ReplaySubject<AbstractFormComponent>();
        this.componentObservable = this.componentSubject.asObservable();
        this.componentSet = false;

        this.componentControlSubject = new ReplaySubject(1);
        this.componentControlObservable = this.componentControlSubject.asObservable();
    }

    get component(): Observable<AbstractFormComponent> {
        return this.componentObservable;
    }

    get control(): Observable<AbstractControl> {
        return this.componentControlObservable;
    }

    setComponent(component: AbstractFormComponent): void {
        if (!component) {
            throw 'Invalid argument: component parameter of FormComponentModel.setComponent cannot be null or undefined.';
        }
        if (this.componentSet) {
            throw 'Invalid operation: call to  FormComponentModel.setComponent cannot when component has already been set.';
        }
        this.componentSubject.next(component);
        this.componentSet = true;
        component.control.first().subscribe(c => {
            this.componentControlSubject.next(c);
        });
    }
}
