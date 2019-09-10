import { Component, OnInit, Inject, Optional } from '@angular/core';
import { WorkRequest } from "../../../interfaces/work-request";
import { WorkRequestService } from '../../../services/work-request/work-request.service';
import { trigger } from "@angular/animations";
import { Location } from "@angular/common";
import { ActivatedRoute } from '@angular/router';
import { Task } from "../../../interfaces/task";
import { TaskService } from "../../../services/task/task.service";
import { TaskUpdate } from "../../../interfaces/task-update";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import {WorkRequestUpdate} from "../../../interfaces/work-request-update";



@Component({
  selector: 'app-viewworkrequest',
  templateUrl: './viewworkrequest.component.html',
  styleUrls: ['./viewworkrequest.component.css']
})
export class ViewworkrequestComponent implements OnInit {

  constructor(public workRequestService: WorkRequestService,
              public taskRequestService: TaskService,
              private route: ActivatedRoute,
              private location: Location,
              private taskService: TaskService,
              private snackBar: MatSnackBar,
              @Optional() private dialogRef: MatDialogRef<ViewworkrequestComponent>,
              @Optional() @Inject(MAT_DIALOG_DATA) public data: any
              ) { }

  workOrderID: string;
  fromDialog: boolean;
  isDataAvailable = false;
  areTasksAvailable = false;
  viewbackbutton = true;
  workRequest = {} as WorkRequest;
  tasks: Array <Task> = [];
  denyAllBox: Boolean = false;
  denyBox: Boolean = false;

  ngOnInit() {
    if(this.data === null) {       
      // _id came from route
      this.fromDialog = false;
      this.workOrderID = this.route.snapshot.paramMap.get('id');
      this.viewbackbutton = true;
    } else {                      
      // _id came from dialog data
      this.fromDialog = true;
      this.workOrderID = this.data.id;
      this.viewbackbutton = false;
    }
    this.getData(this.workOrderID);
  }

  getData(ID: string): void {
    this.workRequestService.getWorkRequest(ID)
      .subscribe((responseData: WorkRequest) => {
        this.workRequest = responseData;
        this.isDataAvailable = true;
        this.getTasks();
      });
  };

  getTasks(): void {
    for (let taskID of this.workRequest.tasks) {
      this.taskRequestService.getTask(taskID.toString())
        .subscribe((responseData: Task) => {
          /*
           * Pretty Printing the start and end dates.
           * 1. First grab the dates
           * 2. Then save them inside their respective fields again as their string
           *    representation
           * 3. Push the Task into the array.
           */
          // let startDate = responseData.startdate;
          // let endDate = responseData.enddate;
          // responseData.startdate = new Date(startDate).toString();
          // responseData.enddate = new Date(endDate).toString();
          this.tasks.push(responseData);
        });
    }
    this.areTasksAvailable = true;
  }

  goBack() {
    this.location.back();
  }

  closeDialog() {
    if(this.fromDialog)
      this.dialogRef.close();
  }

  approve(id, index) {
    // TODO: Update Related Tasks to 'approved' as well.
    let update = {
      'status': 'approved'
    } as TaskUpdate;

    this.tasks[index].status = 'approved';
    this.taskService.updateTask(id, update).subscribe(res => {
      this.snackBar.open('Task #' + res._id + ' Approved!', ':)',{
        duration: 1500,
      });
      this.clearWorkOrder();
    },
    error => {
      console.error(error);
    });
  }

  deny(id, index, reason) {
    // TODO: Update Related Tasks to 'denied' as well.
    let update = {
      'status': 'denied',
      'deniedReason': reason
    } as TaskUpdate;

    this.tasks[index].status = 'denied';
    this.taskService.updateTask(id, update).subscribe(res => {
      this.snackBar.open('Task #' + res._id + ' Denied!', ':(',{
        duration: 1500,
      });
      this.clearWorkOrder();
    },
    error => {
      console.error(error);
    });
  }

  approveall() {
    for(var i = 0; i < this.tasks.length; i++) {
      this.approve(this.tasks[i]._id, i);
    }
  }

  denyall(reason: string) {
    for(var i = 0; i < this.tasks.length; i++) {
      this.deny(this.tasks[i]._id, i,reason);
    }
  }

  //function checks if all tasks in the work request have been approved/denied and marks work order as Reviewed;
  clearWorkOrder () {
    let update = {
      status: 'Reviewed'
    } as WorkRequestUpdate;
    let checkTaskStatus = true;
    for(let i = 0; i < this.tasks.length; i++) {
      if (this.tasks[i].status == 'requested'){
        checkTaskStatus = false;
      }
    }
    if(checkTaskStatus){
      this.workRequestService.updateWorkRequest(this.workRequest._id, update).subscribe( (res)=> {
      });
    }
  }
}
