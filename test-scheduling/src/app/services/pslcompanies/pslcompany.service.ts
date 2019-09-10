import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PslCompanies} from "../../interfaces/pslcompanies";

@Injectable({
  providedIn: 'root'
})
export class PSLCompaniesService {
  pslCompaniesURL = 'http://localhost:3030/pslcompanies';

  constructor(private httpClient: HttpClient) { }

  getPSLCompanies() {
    return this.httpClient.get<PslCompanies>(this.pslCompaniesURL);
  }
}
