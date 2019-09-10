import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tools} from "../../interfaces/tools";

@Injectable({
  providedIn: 'root'
})
export class ToolsService {
  toolsURL = 'http://localhost:3030/tools';

  constructor(private httpClient: HttpClient) { }

  getTools() {
    return this.httpClient.get<Tools>(this.toolsURL);
  }
}
