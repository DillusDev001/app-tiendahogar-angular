import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { provideHttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HashLocationStrategy, LocationStrategy, registerLocaleData } from '@angular/common';
import { SharedModule } from './modules/shared/shared.module';

import localeES from "@angular/common/locales/es";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
registerLocaleData(localeES, "es");

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
  ],
  exports:[ ],
  providers: [provideHttpClient(), { provide: LocationStrategy, useClass: HashLocationStrategy }, provideAnimationsAsync()],
  bootstrap: [AppComponent]
})
export class AppModule { }