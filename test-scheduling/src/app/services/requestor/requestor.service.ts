import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Requestors } from "../../interfaces/requestor";

@Injectable({
  providedIn: 'root'
})
export class RequestorService {
  requestorsURL = 'http://localhost:3030/requestors';

  constructor(private httpClient: HttpClient) { }

  getRequestors() {
    return this.httpClient.get<Requestors>(this.requestorsURL);
  }
}
