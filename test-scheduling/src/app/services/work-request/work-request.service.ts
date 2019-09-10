import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { WorkRequest } from '../../interfaces/work-request';
import { NewWorkRequest } from '../../interfaces/new-work-request';
import { WorkRequests } from '../../interfaces/work-requests';
import { WorkRequestUpdate } from '../../interfaces/work-request-update';

@Injectable({
  providedIn: 'root'
})
export class WorkRequestService {

  // This variable will hold the api endpoint where we will send
  // the http request to create a new 'Work Request'
  private workRequestURL = 'http://localhost:3030/requests/';
  // The constructor now requires the use of an http client
  // This is to follow the best practice that is outlined within the Angular docs.
  constructor(private http: HttpClient) {
    // All HttpClient methods return an RxJS Observable of something.
    // HTTP is a request/response protocol. You make a request, it returns a single response.
    
  }

  createWorkRequest(body: NewWorkRequest) {
    return this.http.post<WorkRequest>(this.workRequestURL, body, httpOptions);
  }

  getWorkRequest(requestID: string) {
    return this.http.get<WorkRequest>(this.workRequestURL + requestID);
  }

  getWorkRequests() {
    return this.http.get<WorkRequests>(this.workRequestURL);
  }

  getPendingWorkRequests(skip: number){
    return this.http.get<WorkRequests>(this.workRequestURL + "?status=requested" + "&$skip=" + skip + "&$limit=10");
  }

  updateWorkRequest(workRequestID: String, body: WorkRequestUpdate) {
    return this.http.patch<WorkRequest>(this.workRequestURL + workRequestID, body, httpOptions);
  }

}
const httpOptions = {
  headers: new HttpHeaders({
    "content-type": "application/json"
  })
};
