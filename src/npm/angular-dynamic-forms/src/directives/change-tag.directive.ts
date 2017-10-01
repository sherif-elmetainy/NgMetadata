import { ElementRef, OnInit, Directive, Input } from '@angular/core';


// ReSharper disable once InconsistentNaming
export const REMOVE_TAG_NAME = 'none';

@Directive({
    selector: '[changeTag]'
})
export class ChangeTagDirective implements OnInit {
    constructor(private readonly element: ElementRef) {

    }

    @Input('changeTag') newTagName: string;

    ngOnInit(): void {
        const nativeElement: HTMLElement = this.element.nativeElement;
        if (!this.newTagName) {
            return;
        }

        const parentElement = nativeElement.parentElement;
        const remove = this.newTagName === REMOVE_TAG_NAME;
        const replacement = remove ? parentElement : nativeElement.ownerDocument.createElement(this.newTagName);

        for (let i = 0; i < nativeElement.attributes.length && !remove; i++) {
            const name = nativeElement.attributes[i].nodeName;
            const val = nativeElement.attributes[i].nodeValue;
            replacement.setAttribute(name, val);
        }
        
        // move all children out of the element
        while (nativeElement.firstChild) {
            replacement.insertBefore(nativeElement.firstChild, nativeElement);
        }

        // remove the empty element(the host)
        if (remove) {
            parentElement.removeChild(nativeElement);
        } else {
            parentElement.replaceChild(replacement, nativeElement);
        }
    }
}