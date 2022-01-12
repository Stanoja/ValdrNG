import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ValdrNgModule} from '../../../valdr-ng/src/lib/valdr-ng.module';
import {ReactiveFormsModule} from '@angular/forms';
import {ValdrErrorComponent} from './valdr-error/valdr-error.component';
import {ValdrFormComponent} from './valdr-form/valdr-form.component';
import {SimpleFormComponent} from './simple-form/simple-form.component';

@NgModule({
  declarations: [
    AppComponent,
    ValdrErrorComponent,
    ValdrFormComponent,
    SimpleFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    ValdrNgModule.forRoot([])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
