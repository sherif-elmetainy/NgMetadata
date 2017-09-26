import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Subscription } from 'rxjs/Subscription';
import { BaseMetadataModel } from '../models/metadata-models';
import { AbstractControl } from '@angular/forms';
import { OnDestroy, Input } from '@angular/core';

/**
 * Base class form form metadata
 */
export abstract class AbstractFormComponent implements OnDestroy {

    private readonly metadataSubject: ReplaySubject<BaseMetadataModel>;
    private readonly metadataObservable: Observable<BaseMetadataModel>;
    private readonly metadataSubscription: Subscription;
    private metadataInternal: BaseMetadataModel | null;
    private readonly isVisibleObservable: Observable<boolean>;
    private readonly formControlSubject: ReplaySubject<AbstractControl>;
    private readonly formControlObservable: Observable<AbstractControl>;


    get metadata(): Observable<BaseMetadataModel> {
        return this.metadataObservable;
    }

    setMetadata(val: BaseMetadataModel): void {
    }

    @Input()
    set inputMetadata(val: BaseMetadataModel) {
        if (!val) {
            throw 'Null Argument: val AbstractFormComponent.setMetadata';
        };
        if (this.metadataInternal !== null) {
            throw 'Invalid operation: Metadata has already been set.';
        };
        this.metadataInternal = val;
        this.metadataSubject.next(val);
        this.metadataSubject.complete();
    }

    get inputMetadata(): BaseMetadataModel {
        return this.metadataInternal as BaseMetadataModel;
    }

    /**
     * Constuctor. initializes a new instance of AbstractFormMetadata
     * @param metadata - metadata information that was retrieved from the server.
     * @param typeConverterService - A type converter service
     */
    protected constructor() {
        this.metadataSubject = new ReplaySubject<BaseMetadataModel>(1);
        this.metadataObservable = this.metadataSubject.asObservable();

        this.formControlSubject = new ReplaySubject<AbstractControl>(1);
        this.formControlObservable = this.formControlSubject.asObservable();

        this.metadataInternal = null;

        this.isVisibleObservable = this.metadataObservable.map(v => v !== null);

        this.metadataSubscription = this.metadataObservable.subscribe(val => {
            this.createFormControl(val).subscribe(v => {
                this.formControlSubject.next(v);
                this.formControlSubject.complete();
            });
        });
    }

    ngOnDestroy(): void {
        this.metadataSubscription.unsubscribe();
        this.metadataSubject.complete();
        this.formControlSubject.complete();
    }


    get isVisible(): Observable<boolean> {
        return this.isVisibleObservable;
    }

    /**
     * Gets the value of the property
     * @returns {} 
     */
    abstract get value(): Observable<any>;
    /**
     * Sets the value of the property
     * @param newVal 
     * @returns {} 
     */
    abstract set value(newVal: Observable<any>);

    /**
     * Creates abstract control for this
     */
    protected abstract createFormControl(metadata: BaseMetadataModel): Observable<AbstractControl>;

    /**
     * Gets the Angular control. 
     * @returns {} 
     */
    get control(): Observable<AbstractControl> {
        return this.formControlObservable;
    }
}
