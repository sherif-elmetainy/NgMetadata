import { Directive, ViewContainerRef } from '@angular/core';

/** @internal */
@Directive({
    selector: '[formHost]'
})
export class FormHostDirective {
    constructor(public viewContainerRef: ViewContainerRef) { }
}
