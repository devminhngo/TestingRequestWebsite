import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { NewTask } from "../../interfaces/new-task";
import { Task } from "../../interfaces/task";
import { Tasks } from 'src/app/interfaces/tasks';
import { TaskUpdate } from 'src/app/interfaces/task-update';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private taskURL: string = 'http://localhost:3030/tasks/';

  constructor(private httpClient: HttpClient, public JwtHelper: JwtHelperService) { }

  createTask(task: NewTask) {
    return this.httpClient.post<Task>(this.taskURL, task, headers);
  }

  getTask(taskID: string) {
    return this.httpClient.get<Task>(this.taskURL + taskID);
  }

  getTasks() {
    return this.httpClient.get<Tasks>(this.taskURL, headers);
  }

  getPendingTasks(skip: number) {
    return this.httpClient.get<Tasks>(this.taskURL + '?status=requested' + '&$skip=' + skip);
  }

  updateTask(taskID: String, body: TaskUpdate) {
    return this.httpClient.patch<Task>(this.taskURL + taskID, body, headers);
  }
}

let jwt = localStorage.getItem('accessToken');

const headers = {
  headers: new HttpHeaders({
    "content-type": "application/json",
    "Authorization": `Bearer ${jwt}`
  })
};
