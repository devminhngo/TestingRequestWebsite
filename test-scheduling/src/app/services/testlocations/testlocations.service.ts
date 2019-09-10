import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TestLocations } from 'src/app/interfaces/testlocations'

@Injectable({
  providedIn: 'root'
})
export class TestlocationsService {
  testLocationsURL = 'http://localhost:3030/test-locations';
  constructor(
    private httpClient: HttpClient,
  ) { }

  getTestLocations() {
    return this.httpClient.get<TestLocations>(this.testLocationsURL);
  }
}
