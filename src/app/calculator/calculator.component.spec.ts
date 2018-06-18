import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatorComponent } from './calculator.component';
import { DisplayComponent } from '../display/display.component';
import { ButtonComponent } from '../button/button.component';

import { HttpClientModule } from '@angular/common/http';

// used to create fake backend
import { fakeBackendProvider } from '../_helpers/fake_backend';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions } from '@angular/http';
import { CalcService } from '../_services/calc.service';

describe('CalculatorComponent', () => {
  let component: CalculatorComponent;
  let fixture: ComponentFixture<CalculatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CalculatorComponent,
        DisplayComponent,
        ButtonComponent
       ],
       imports: [
         HttpClientModule
       ],
       providers: [
         // providers used to create fake backend
         fakeBackendProvider,
         MockBackend,
         BaseRequestOptions,
         CalcService
        ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the calculator component', () => {
    expect(component)
    .toBeTruthy();
  });
});
