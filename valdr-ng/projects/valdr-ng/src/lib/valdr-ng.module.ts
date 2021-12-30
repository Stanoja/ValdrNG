import {NgModule} from '@angular/core';
import {ValdrNgService} from './valdr-ng.service';
import {CommonModule} from '@angular/common';

/**
 * ValdrNG module.
 */
@NgModule({
    providers: [
        ValdrNgService
    ],
    imports: [
        CommonModule
    ]
})
export class ValdrNgModule { }
