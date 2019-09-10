import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChargeCodes } from 'src/app/interfaces/chargecodes';

@Injectable({
  providedIn: 'root'
})
export class ChargeCodesService {
  chargeCodesURL = 'http://localhost:3030/chargecodes';
  constructor(
    private httpClient: HttpClient
  ) { }

  getChargeCodes() {
    return this.httpClient.get<ChargeCodes>(this.chargeCodesURL);
  }
}
