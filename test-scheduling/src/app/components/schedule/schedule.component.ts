import { Component, OnInit, ViewChild, Inject, Optional, EventEmitter} from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGrigPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Task } from '../../interfaces/task';
import { Tasks } from '../../interfaces/tasks';
import { TaskService } from '../../services/task/task.service';
import { Router } from '@angular/router';
import { ViewtaskComponent } from '../tasks/viewtask/viewtask.component';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  @ViewChild('calendar') calendarComponent: FullCalendarComponent; // the #calendar in the template
  onAdd = new EventEmitter();

  // Color Strings
  requested: string = "#3F51B5";
  tentative: string = "#CD2B87";
  approved: string = "#FF9136";
  completed: string = "#000";
  cancelled: string = "#aaa";
  shutdown: string = "#FF3636";

  newEventMade: boolean = false;
  startdateChosen: String = '';
  enddateChosen: String = '';
  index: Number;
  isDialogmode: boolean = false; // Editable Calendar when true
  calendarPlugins = [dayGridPlugin, timeGrigPlugin, interactionPlugin];
  tasksData: Tasks = {total: 0, limit: 0, skip: 0, data: []};
  taskarray: Task[] = [];

  calendarEvents: EventInput[] = [];

  constructor(
    public taskService: TaskService,
    private router: Router,
    public dialog: MatDialog,
    @Optional() public dialogRef: MatDialogRef<ScheduleComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    // checks if we are viewing in a dialog window
    if(this.data != null)
      this.isDialogmode = true;

    this.getTasks();
  }

  getTasks(): void {
    this.taskService.getTasks()
      .subscribe(
        (responseData: Tasks) => {
          for(let i = 0; i < responseData.data.length; i++) {

            this.taskarray.push(responseData.data[i]);

            var startdate: Date = new Date(this.taskarray[i].startdate);
            var duration = +(this.taskarray[i].duration);
            var enddate: Date = new Date(startdate);
            enddate.setUTCHours(enddate.getUTCHours() + duration);
            var status: string;
      
            if(this.taskarray[i].status === "requested")
              status = this.requested;
            else if(this.taskarray[i].status === "approved")
              status = this.approved;
            else if(this.taskarray[i].status === "denied")
              status = this.cancelled;
            
            this.calendarEvents = this.calendarEvents.concat({
              id: String(this.taskarray[i]._id),
              title: String(this.taskarray[i].id + ' ' + this.taskarray[i].testDescription),
              start: String(startdate.toISOString()),
              end: String(enddate.toISOString()),
              backgroundColor: status, borderColor : status
            })
          }
      },
      error => {
      });
  }


  handleDateClick(arg) {

    if(this.isDialogmode) {

      // limits adding tasks to just 1 task
      if(this.newEventMade) {
        this.calendarEvents.pop();
      }


      var startdate: Date = new Date(arg.dateStr + 'T' + this.data.starttime);
      var duration = +(this.data.duration);
      var enddate: Date = new Date(startdate);
      enddate.setUTCHours(enddate.getUTCHours() + duration);
      

      // mock task to add to calendar
      this.calendarEvents = this.calendarEvents.concat({ 
        title: 'New Task',
        start: String(startdate.toISOString()),
        end: String(enddate.toISOString()),
        backgroundColor: this.requested, borderColor : this.requested
      });

      // task has been added
      this.startdateChosen = new Date(startdate.getTime() - (startdate.getTimezoneOffset() * 60000)).toISOString().slice(0, -1);
      this.enddateChosen = new Date(enddate.getTime() - (enddate.getTimezoneOffset() * 60000)).toISOString().slice(0,-1);
      this.newEventMade = true;
    }
  }

  // Function to open dialog of task when its clicked
  handleEventClick(arg) {
    const dialogRef = this.dialog.open(ViewtaskComponent, {
      width: '70%',
      height: '90%',
      data: {
        id: arg.event.id
      }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  // This is how we return data to CreateWorkRequest
  close() {
    this.index = this.data.taskIndex;
    this.dialogRef.close({ starttime : this.startdateChosen, endtime : this.enddateChosen, index: this.index});
  }

}
