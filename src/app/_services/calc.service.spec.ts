// src/app/user.service.spec.ts
import { CalcService } from './calc.service';
import { inject, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

// used to create fake backend
import { fakeBackendProvider } from '../_helpers/fake_backend';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions } from '@angular/http';

describe('Calculator Service Test', () => {

  let service: CalcService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        // providers used to create fake backend
        fakeBackendProvider,
        MockBackend,
        BaseRequestOptions,
        CalcService
      ]
    });

    // inject the service
    service = TestBed.get(CalcService);
    httpMock = TestBed.get(HttpTestingController);

  });

  it('Should define Calculator service: ', inject([CalcService], calcService => {
    expect(calcService)
    .toBeDefined();
  }));

  it('should post the correct data', () => {
    service.callfunction(12, 34, '+')
    .subscribe((data: any) => {

      expect(data.result)
      .toEqual(1231);
    });
    httpMock.verify();
  });

  it('should calculate 12 + 34', inject([CalcService], calcService => {

    calcService.setVariables(12, 34, '+');

    expect(calcService.getOne())
    .toEqual(12);

    // calcService.callfunction(12, 34, '+')
    // .subscribe(data => {

    //   expect(data.result)
    //   .toEqual(42226);

    // });
  }));

});
