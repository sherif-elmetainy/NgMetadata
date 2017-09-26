import { Component, AfterViewInit, ViewChild, Input, ComponentFactoryResolver } from '@angular/core';
import { FormHostDirective } from '../directives/form-host.directive';
import { FormComponentModel } from '../models/form-component.model';

/** @internal */
@Component({
    selector: 'form-input-host',
    templateUrl: './form-input-host.component.html'
})
export class FormInputHostComponent implements AfterViewInit {

    @ViewChild(FormHostDirective) hostChild: FormHostDirective;

    private formComponentModelInternal: FormComponentModel | null;
    intputType: string = 'text';
    cssClassName: string = 'form-control';

    @Input()
    set formComponentModel(val: FormComponentModel|null) {
        this.formComponentModelInternal = val;
        if (this.viewInitialized) {
            this.loadComponent();
        }
    }

    get formComponentModel(): FormComponentModel|null {
        return this.formComponentModelInternal;
    }
    private viewInitialized: boolean;

    constructor(private readonly componentFactoryResolver: ComponentFactoryResolver) {
        this.viewInitialized = false;
        this.formComponentModelInternal = null;
    }

    ngAfterViewInit(): void {
        this.viewInitialized = true;
        if (this.formComponentModel) {
            this.loadComponent();
        }
    }

    private loadComponent(): void {
        const viewContainerRef = this.hostChild.viewContainerRef;
        viewContainerRef.clear();
        if (this.formComponentModel) {
            const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.formComponentModel.type);
            const componentRef = viewContainerRef.createComponent(componentFactory);

            const component = componentRef.instance;
            this.formComponentModel.setComponent(component);
            component.setMetadata(this.formComponentModel.metadata);
        }
    }
}
