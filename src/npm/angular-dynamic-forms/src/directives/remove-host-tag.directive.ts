import { ElementRef, OnInit, Directive } from '@angular/core';

@Directive({
    selector: '[removeHost]'
})
export class RemoveHostTagDirective implements OnInit {
    constructor(private readonly element: ElementRef) {

    }

    ngOnInit(): void {

        const nativeElement: HTMLElement = this.element.nativeElement;
        const parentElement = nativeElement.parentElement;

        // move all children out of the element
        while (nativeElement.firstChild) {
            parentElement.insertBefore(nativeElement.firstChild, nativeElement);
        }
        // remove the empty element(the host)
        parentElement.removeChild(nativeElement);
    }
}