import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Priorities } from 'src/app/interfaces/priorities';

@Injectable({
  providedIn: 'root'
})
export class PrioritiesService {
  prioritiesURL = 'http://localhost:3030/priorities';
  constructor(
    private httpClient: HttpClient,
  ) { }

  getPriorities() {
    return this.httpClient.get<Priorities>(this.prioritiesURL);
  }
}
