import { Component } from '@angular/core';
import { ArrayModel } from '../models/array.model';
import { AbstractFormComponent } from './abstract-form.component';
import { AbstractFormModel } from '../models/abstract-form.model'

@Component({
    templateUrl: './array.component.html'    
})
export class ArrayComponent extends AbstractFormComponent {
    constructor() {
        super();
    }

    get arrayModel(): ArrayModel {
        return this.model as ArrayModel;
    }

    add(): void {
        this.arrayModel.add();
    }

    remove(element: AbstractFormModel): void {
        this.arrayModel.remove(element);
    }

    up(element: AbstractFormModel) : void {
        this.arrayModel.up(element);
    }

    down(element: AbstractFormModel): void {
        this.arrayModel.down(element);
    }

    top(element: AbstractFormModel): void {
        this.arrayModel.top(element);
    }

    bottom(element: AbstractFormModel): void {
        this.arrayModel.bottom(element);
    }

    isLast(element: AbstractFormModel): boolean {
        return this.arrayModel.formModels.length > 0 &&
            this.arrayModel.formModels[this.arrayModel.formModels.length - 1] === element;
    }

    isTop(element: AbstractFormModel) {
        return this.arrayModel.formModels.indexOf(element) === 0;
    }

    isBottom(element: AbstractFormModel) {
        return this.arrayModel.formModels.indexOf(element) === this.arrayModel.formModels.length - 1;
    }

    isFirst(element: AbstractFormModel): boolean {
        return this.arrayModel.formModels.length > 0 &&
            this.arrayModel.formModels[0] === element;
    }
}