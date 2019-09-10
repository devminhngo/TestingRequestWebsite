import { Component, OnInit, Inject, Optional } from '@angular/core';
import { ViewTask } from "../../../interfaces/view-task";
import { WorkRequestService } from '../../../services/work-request/work-request.service';
import { trigger } from "@angular/animations";
import { Location } from "@angular/common";
import { WorkRequest } from "../../../interfaces/work-request";
import { ActivatedRoute } from '@angular/router';
import { TaskService } from "../../../services/task/task.service";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';




@Component({
  selector: 'app-viewtask',
  templateUrl: './viewtask.component.html',
  styleUrls: ['./viewtask.component.css']
})
export class ViewtaskComponent implements OnInit {

  constructor(public workRequestService: WorkRequestService,
    public taskRequestService: TaskService,
    public route: ActivatedRoute,
    public location: Location,
    @Optional() private dialogRef: MatDialogRef<ViewtaskComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
    ) { }
    
  taskID: string;
  isDataAvailable = false;
  isWorkRequestAvailable = false;
  fromDialog: boolean;
  viewbackbutton = true;
  task = {} as ViewTask; //we are populating this one
  public workRequest = {} as WorkRequest;


  ngOnInit() {
    if(this.data === null) {       
      // _id came from route
      this.fromDialog = false;
      this.taskID = this.route.snapshot.paramMap.get('id');
      this.viewbackbutton = true;
    } else {                      
      // _id came from dialog data
      this.fromDialog = true;
      this.taskID = this.data.id;
      this.viewbackbutton = false;
    }
    this.getData(this.taskID);
  }

  getData(ID: string): void {
    this.taskRequestService.getTask(ID)
      .subscribe((responseData: ViewTask) => {
        this.task = responseData;

        this.isDataAvailable = this.task._id != null;
        this.getWorkRequest();
      });
  }

  getWorkRequest(): void {
    this.workRequestService.getWorkRequest(this.task.WorkRequestId.toString())
      .subscribe((responseData: WorkRequest) => {
        this.workRequest = responseData;
      });
  }

  goBack() {
    this.location.back();
  }

}
