import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Resources} from "../../interfaces/resources";

@Injectable({
  providedIn: 'root'
})
export class ResourcesService {
  resourcesURL = 'http://localhost:3030/resources';

  constructor(private httpClient: HttpClient) { }

  getResources() {
    return this.httpClient.get<Resources>(this.resourcesURL);
  }
}
