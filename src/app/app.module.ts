import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// used to create fake backend
import { fakeBackendProvider } from './_helpers/fake_backend';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions } from '@angular/http';

import { AppComponent } from './app.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { DisplayComponent } from './display/display.component';
import { ButtonComponent } from './button/button.component';
import { CalcService } from './_services/calc.service';
import { HttpClientModule } from '@angular/common/http';
import { LogComponent } from './log/log.component';

@NgModule({
  declarations: [
    AppComponent,
    CalculatorComponent,
    DisplayComponent,
    ButtonComponent,
    LogComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    // providers used to create fake backend
    fakeBackendProvider,
    MockBackend,
    BaseRequestOptions,
    CalcService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
