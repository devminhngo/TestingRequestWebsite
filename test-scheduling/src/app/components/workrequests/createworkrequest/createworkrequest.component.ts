import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WorkRequestService } from '../../../services/work-request/work-request.service';
import { TaskService } from "../../../services/task/task.service";
import { NewWorkRequest } from '../../../interfaces/new-work-request';
import {FormBuilder, FormGroup, FormArray, FormControl} from "@angular/forms";
import {Validators} from "@angular/forms";
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { NewTask } from '../../../interfaces/new-task';
import {MatSnackBar, MatDialog, MatFormField} from '@angular/material';
import { TaskUpdate } from '../../../interfaces/task-update';
import { GroupsService } from '../../../services/groups/groups.service';
import { PrioritiesService } from '../../../services/priorities/priorities.service';
import { ChargeCodesService } from '../../../services/chargecodes/chargecodes.service';
import { TestlocationsService } from '../../../services/testlocations/testlocations.service';
import { FileUploadServiceService} from '../../../services/file-upload-service/file-upload-service.service';
import {PSLCompaniesService} from "../../../services/pslcompanies/pslcompany.service";
import {RequestorService} from "../../../services/requestor/requestor.service";
import {RequestDriverService} from "../../../services/request-driver/request-driver.service";
import {ResourcesService} from "../../../services/resources/resources.service";
import {TestContactsService} from "../../../services/test-contact/test-contact.service";
import {ToolsService} from "../../../services/tools/tools.service";
import { ScheduleComponent } from '../../schedule/schedule.component';
import {Tasks} from "../../../interfaces/tasks";

@Component({
  selector: 'app-createworkrequest',
  templateUrl: './createworkrequest.component.html',
  styleUrls: ['./createworkrequest.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true}
  }]
})

export class CreateworkrequestComponent implements OnInit {
  title = 'Create Work Requests';
  
  //form groups that will hold all the controls.
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  // Values Used to select times.
  hourValues = initHourValues();
  minuteValues = initMinuteValues();
  periodValues = ['AM', 'PM'];

  groups: Array<String> = new Array<String>();
  priorities: Array<String> = new Array<String>();
  chargecodes: Array<Number> = new Array<Number>();
  pslcompanies: Array<String> = new Array<String>();
  requestdrivers: Array<String> = new Array<String>();
  resources: Array<String> = new Array<String>();
  requestors: Array<String> = new Array<String>();
  testlocations: Array<String> = new Array<String>();
  testContacts: Array<String> = new Array<String>();
  tools: Array<String> = new Array<String>();
  users: Array<String> = new Array<String>();
  startdatechosen : String;
  enddatechosen : String;
  validSelectedTime: Array<Boolean> = [];

  public fileUploader: FileUploadServiceService;
  constructor(
    //private fileUploader: FileUploadServiceService,

    private fb: FormBuilder,
    public workRequestService: WorkRequestService,
    public taskService: TaskService,
    public groupsService: GroupsService,
    private http: HttpClient,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    public prioritiesService: PrioritiesService,
    public chargeCodesService: ChargeCodesService,
    public testLocationsService: TestlocationsService,
    public toolsService: ToolsService,
    public pslComaniesService: PSLCompaniesService,
    public requestorService: RequestorService,
    public requestDriversSerive: RequestDriverService,
    public resourcesService: ResourcesService,
    public testContactsService: TestContactsService
  )
  {
    this.fileUploader = new FileUploadServiceService(http);
   }

  async submitRequest() {
    let newWorkReq: NewWorkRequest = new Object() as NewWorkRequest;

    let workReq = this.firstFormGroup;

    /*
     * Use a for loop to iterate through the keys for the first form group.
     * Copy the values to their corresponding object within the new work request
     * object.
     */
    for (let input in workReq.value) {
      newWorkReq[input.toLowerCase()] = workReq.controls[input.toLowerCase()].value;
    }

    /*
     * First thing we do is submit the tasks associated with the work request.
     * The submitTasks function returns a String Array that holds the task object
     * ids. We then save these within the new work request's tasks field.
     */
    newWorkReq.tasks = await this.submitTasks();

    /*
     * Created a new object that uses the TaskUpdate interface.
     * This interface uses the same fields as Task, but includes every
     * parameter as optional since PATCH requests do not require the
     * entire object information to update it.
     */
    let taskUpdate:TaskUpdate = new Object() as TaskUpdate;

    /*
     * We use async/await to make tne calling function wait for the createWorkRequest
     * function to finish. This is why we use the 'toPromise()' function.
     * This converts the http request to a promise that we resolve using 'await'.
     */
    await this.workRequestService.createWorkRequest(newWorkReq).toPromise()
      .then((data) => {
      /* Open a Material 'SnackBar' to show that we created the work request. */
      this.snackBar.open('Work Request was successfully created!', 'Dismiss',{
        duration: 1500,
      });
      /*
       * We save the Work Request ID here within the task update object,
       * so that we may update the newly created tasks to have the id of the
       * work request they are tied to.
       */
      taskUpdate.WorkRequestId = data._id;
      })
      .catch((error) => {
        /*
         * This block catches all errors. It alerts the user that an error
         * has occurred, and then errors within the console.
         */
        this.snackBar.open('Error creating Work Request!', 'Dismiss', {
        duration: 1500,
      });
      console.error(error);
    });

    /* Finally we update the newly created tasks so that they're tied to the Work Request */
    this.updateTasks(newWorkReq.tasks, taskUpdate);
    //RESET STEPPER?
  }

  async submitTasks() {
    let newTask: NewTask = {} as NewTask;
    let taskIDs: Array<String> = [];
    let tasks = this.secondFormGroup.controls['tasksarray'].value;
    let counter = 0;
    for (let task in tasks) {
      newTask = tasks[task];
      // Grab the new task and create it.
      newTask = this.setStartDate(newTask);
      let id;
      await this.taskService.createTask(newTask).toPromise().then(res => {
        taskIDs.push(res._id);
        id = res._id;
      })
      .catch(error => {
        console.warn(`An error occurred sending the task.\n\
        ${error}`);
      });
      for(let i = 0;i<this.fileUploader.ListFileList[counter].length;i++) {

        this.fileUploader.ListFileList[counter][i].taskId = id;
        await this.fileUploader.postFile(this.fileUploader.ListFileList[counter][i]).toPromise().then(data => {
          },
          error => {
          });
      }

         counter++;
    }
    return taskIDs;
  }

  updateTasks(tasks: Array<String>, update: any) {
    for (let i = 0; i < tasks.length; i++) {
      this.taskService.updateTask(tasks[i], update).subscribe(
        (res) => {
        },
        (error) => {
        }
      );
    }
  }

  async getGroups() {
    await this.groupsService.getGroups().toPromise().then(res => {
      this.groups = res.result;
    })
    .catch(error => {
    });
  }

  async getPriorities() {
    await this.prioritiesService.getPriorities().toPromise().then(res => {
      this.priorities = res.result;
    })
    .catch(error => {
    });
  }

  async getChargeCodes() {
    await this.chargeCodesService.getChargeCodes().toPromise().then(res => {
      this.chargecodes = res.result;
    })
    .catch(error => {
      // console.error(error);
    });
  }

  async getTestLocations() {
    await this.testLocationsService.getTestLocations().toPromise().then(res => {
      this.testlocations = res.result;
    })
    .catch(error => {
      // console.error(error);
    });
  }

  async getTools() {
    await this.toolsService.getTools().toPromise().then(res => {
      this.tools = res.result;
    })
      .catch(error => {
        // console.error(error);
      });
  }

  async getPslCompanies() {
    await this.pslComaniesService.getPSLCompanies().toPromise().then(res => {
      this.pslcompanies = res.result;
    })
      .catch(error => {
        // console.error(error);
      });
  }

  async getRequestors() {
    await this.requestorService.getRequestors().toPromise().then(res => {
      this.requestors = res.result;
    })
      .catch(error => {
        // console.error(error);
      });
  }

  async getRequestDrivers() {
    await this.requestDriversSerive.getRequestDriver().toPromise().then(res => {
      this.requestdrivers = res.result;
    })
      .catch(error => {
        // console.error(error);
      });
  }

  async getResources() {
    await this.resourcesService.getResources().toPromise().then(res => {
      this.resources = res.result;
    })
      .catch(error => {
        // console.error(error);
      });
  }

  async getTestContacts() {
    await this.testContactsService.getTestContacts().toPromise().then(res => {
      this.testContacts = res.result;
    })
      .catch(error => {
        // console.error(error);
      });
  }


  setStartDate(task: any, index?) {
    if(task.selectedStartTime.hour != '' && task.selectedStartTime.minute != '' && task.selectedStartTime.period != ''){
      this.validSelectedTime[index] = true;
    }
    let {hour, minute, period} = task.selectedStartTime;
    let {startdate, duration} = task;

    if (Number.parseInt(hour) === 12 && period.toString() === 'AM') {
      hour = 0;
    }
    else if (Number.parseInt(hour) === 12 && period.toString() === 'PM') {
      hour = Number.parseInt(hour);
    }
    else if (Number.parseInt(hour) < 12 && period.toString() === 'PM') {
      hour = 12 + Number.parseInt(hour);
    }
    
    // Parse Strings for Integers
    minute = Number.parseInt(minute);
    duration = Number.parseInt(duration)

    // Calculate the datetime at which it starts and at which it ends
    let exactstartime = new Date(startdate);
    let exactstoptime = new Date(startdate);
    exactstartime.setHours(hour, minute);
    exactstoptime.setHours(hour + duration, minute);

    // Assign it back to the task and then return the task to be assigned.
    task.startdate = exactstartime;
    task.enddate = exactstoptime;
    task.selectedStartTime = `${hour.toString().padStart(2, 0)}:${minute.toString().padStart(2, 0)}:00`;
    return task;
  }

  addTask(){
    this.tasksArray.push(
      this.fb.group({
        tool: [''],
        resource: [''],
        duration: [''],
        testContact: [''],
        priority: [''],
        companyPSL: [''],
        group: [''],
        PSLParticipation: [''],
        testDescription: [''],
        startdate: [''],
        enddate: [''],
        selectedStartTime: this.fb.group({
          hour: [''],
          minute: [''],
          period: [''],
        }),
    }));
    this.validSelectedTime.push(false);
    this.fileUploader.ListFileList.push([]);
  }

  // Deletes task at index
  deleteTask(index){
    this.tasksArray.removeAt(index);
  }

  // Empties the task array (for when the entire work request form is reset)
  resetTasks() {
    while(this.tasksArray.length != 0)
      this.tasksArray.removeAt(0);

    this.addTask();
  }

  // Returns Array as FormArray Object to be called in other functions
  get tasksArray() {
    return this.secondFormGroup.get('tasksarray') as FormArray;
  }

  // Handles initialization tasks
  ngOnInit() {

    this.firstFormGroup = this.fb.group({
      testlocation: ['', Validators.required],
      requestor: [''],
      driver: [''],
      chargecode: [''],
      description: [''],
      requestcomments: [''],
    });

    this.secondFormGroup = this.fb.group({
      // Currently only storing the tasksarray because no other form objects in this formgroup are outside of the task array.
      tasksarray: this.fb.array([], Validators.minLength(1))
    });

    //calls add function to add first task to the work order;
    this.addTask();

    // Grab all the group values from the API.
    this.getGroups();

    // Grab all the priorities
    this.getPriorities();

    // Grab all the charge codes
    this.getChargeCodes();

    // Grab all the test locations
    this.getTestLocations();

    //Grab all the tools
    this.getTools();

    //Grab all the requestors
    this.getRequestors();

    //Grab all the resources
    this.getResources();

    //Grab all request drivers
    this.getRequestDrivers();

    //Grab all test-Contacts
    this.getTestContacts();

    //grab all the psl companies
    this.getPslCompanies();

  }

  openDialog(index): void {
    let tasks = this.secondFormGroup.controls['tasksarray'].value;
    let task = this.setStartDate(tasks[index], index);
    // Data sent to schedule component
    if (this.validSelectedTime[index] == false) {
      this.snackBar.open('Please select a valid time', 'Dismiss', {
        duration: 1500,
      });
    } else if (task.duration == '') {
      this.snackBar.open('Please enter a duration', 'Dismiss', {
        duration: 1500,
      });
    } else {
      const dialogRef = this.dialog.open(ScheduleComponent, {
        disableClose: true,
        data: {
          isdialog: true,
          duration: task.duration,  //NEED TO SEND ACTUAL DURATION
          starttime: task.selectedStartTime, //NEED TO SEND ACTUAL STARTTIME
          taskIndex: index
        }
      });

      // Data returned from schedule component
      dialogRef.afterClosed().subscribe(result => {
          this.startdatechosen = result.starttime;
          this.enddatechosen = result.endtime;
          (<FormArray>this.secondFormGroup.controls['tasksarray']).at(result.index).patchValue({
            startdate: result.starttime
          })
      });
    }
  }
}

function initHourValues() {
  let values = new Array();
  for (let i = 1; i < 13; i++) {
    values.push(i.toString().padStart(2, "0"));
  }
  return values;
}

function initMinuteValues() {
  let values = new Array();
  for (let i = 0; i < 61; i++) {
    values.push(i.toString().padStart(2, "0"));
  }
  return values;
}
