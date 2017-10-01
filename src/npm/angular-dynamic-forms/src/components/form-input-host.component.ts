import { Component, AfterViewInit, ViewChild, Input, ComponentFactoryResolver, ChangeDetectorRef } from '@angular/core';
import { FormHostDirective } from '../directives/form-host.directive';
import { AbstractFormModel } from '../models/abstract-form-model';

/** @internal */
@Component({
    selector: 'form-input-host',
    templateUrl: './form-input-host.component.html'
})
export class FormInputHostComponent implements AfterViewInit {

    @ViewChild(FormHostDirective) hostChild: FormHostDirective;

    private modelInternal: AbstractFormModel | null;
    intputType: string = 'text';
    cssClassName: string = 'form-control';

    @Input()
    set model(val: AbstractFormModel|null) {
        this.modelInternal = val;
        if (this.viewInitialized) {
            this.loadComponent();
        }
    }

    get model(): AbstractFormModel|null {
        return this.modelInternal;
    }

    private viewInitialized: boolean;

    constructor(private readonly componentFactoryResolver: ComponentFactoryResolver, private readonly changeDetector: ChangeDetectorRef) {
        this.viewInitialized = false;
        this.modelInternal = null;
    }

    ngAfterViewInit(): void {
        this.viewInitialized = true;
        if (this.model !== null) {
            this.loadComponent();
        }
    }

    private loadComponent(): void {
        const viewContainerRef = this.hostChild.viewContainerRef;
        viewContainerRef.clear();
        if (this.model) {
            const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.model.componentType);
            const componentRef = viewContainerRef.createComponent(componentFactory);

            const component = componentRef.instance;
            component.model = this.model;

            this.changeDetector.detectChanges();
        }
    }
}
