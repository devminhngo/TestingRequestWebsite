import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Groups } from 'src/app/interfaces/groups';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {
  groupsURL = 'http://localhost:3030/groups';

  constructor(private httpClient: HttpClient) { }

  getGroups() {
    return this.httpClient.get<Groups>(this.groupsURL);
  }
}