import { Component, Inject } from '@angular/core';
import { SPA_METADATA_CULTURE_SERVICE, ICultureService } from '@code-art/angular-dynamic-forms';

@Component({
    templateUrl: './example-form.component.html'
})
export class ExampleFormComponent {

    private readonly key: string;

    constructor(@Inject(SPA_METADATA_CULTURE_SERVICE) private readonly  cultureService: ICultureService) {
        this.key = 'ExampleModel';
    }

    get culture(): string {
        return this.cultureService.currentCulture;
    }

    set culture(val: string) {
        this.cultureService.currentCulture = val;
    }
}