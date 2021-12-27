import {NgModule} from '@angular/core';
import {ValdrNgService} from './valdr-ng.service';
import { ValdrErrorComponent } from './valdr-error/valdr-error.component';
import {CommonModule} from "@angular/common";

/**
 * ValdrNG module.
 */
@NgModule({
    providers: [
        ValdrNgService
    ],
    declarations: [
        ValdrErrorComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        ValdrErrorComponent
    ]
})
export class ValdrNgModule { }
