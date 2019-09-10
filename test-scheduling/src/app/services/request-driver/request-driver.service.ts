import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {RequestDriver} from "../../interfaces/request-driver";

@Injectable({
  providedIn: 'root'
})
export class RequestDriverService {
  driversURL = 'http://localhost:3030/request-drivers';

  constructor(private httpClient: HttpClient) { }

  getRequestDriver() {
    return this.httpClient.get<RequestDriver>(this.driversURL);
  }
}
