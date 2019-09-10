import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TestContacts} from "../../interfaces/test-contact";

@Injectable({
  providedIn: 'root'
})
export class TestContactsService {
  testContactsURL = 'http://localhost:3030/contacts';

  constructor(private httpClient: HttpClient) { }

  getTestContacts() {
    return this.httpClient.get<TestContacts>(this.testContactsURL);
  }
}
