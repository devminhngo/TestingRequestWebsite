import { TestBed, inject } from '@angular/core/testing';

import { ChargeCodesService } from './chargecodes.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { ChargeCodes } from "src/app/interfaces/chargecodes";

describe('ChargeCodes Service', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ]
    });

  });

  it('should be created', () => {
    const service: ChargeCodesService = TestBed.get(ChargeCodesService);
    expect(service).toBeTruthy();
  });

  it('Testing ChargeCodes Service', inject([HttpTestingController, ChargeCodesService],
    (httpMock: HttpTestingController, service: ChargeCodesService) => {
      let expectedResult = [1, 2, 3, 4, 5, 6];

      service.getChargeCodes().subscribe((data: ChargeCodes) => {
        // Check to make sure that the result is defined
        expect(data.result).toBeDefined();   
        
        // Check to make sure that we received the expected result.
        expect(data.result).toEqual(expectedResult);
      });

      const req = httpMock.expectOne('http://localhost:3030/chargecodes');

      req.flush({"result":expectedResult});

      httpMock.verify();
    })
  );

});
