import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkRequest } from "../../../interfaces/work-request";
import { WorkRequests } from '../../../interfaces/work-requests';
import { WorkRequestService } from '../../../services/work-request/work-request.service';
import { NewWorkRequest } from '../../../interfaces/new-work-request';
import { CreateworkrequestComponent } from './createworkrequest.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatToolbarModule, MatSidenavModule, MatIconModule, MatListModule, MatCardModule, MatInputModule, MatDividerModule, MatFormFieldModule, MatCheckboxModule, MatDatepickerModule, MatNativeDateModule, MatStepperModule, MatSelectModule, MatSnackBarModule} from '@angular/material';
import { Form, FormArray, FormsModule} from '@angular/forms';
import { ReactiveFormsModule} from "@angular/forms";
import {ɵRender3ComponentRef} from "@angular/core";
import {Tools} from "../../../interfaces/tools";
import {of, throwError} from "rxjs";
import {Groups} from "../../../interfaces/groups";
import {Priorities} from "../../../interfaces/priorities";
import {ChargeCodes} from "../../../interfaces/chargecodes";
import {TestLocations} from "../../../interfaces/testlocations";
import {PslCompanies} from "../../../interfaces/pslcompanies";
import {Requestors} from "../../../interfaces/requestor";
import {RequestDriver} from "../../../interfaces/request-driver";
import {Resources} from "../../../interfaces/resources";
import {TestContacts} from "../../../interfaces/test-contact";
import {TaskUpdate} from "../../../interfaces/task-update";
import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';

describe('CreateworkrequestComponent', () => {
  let component: CreateworkrequestComponent;
  let fixture: ComponentFixture<CreateworkrequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        MatButtonModule,
        MatToolbarModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        MatCardModule,
        MatFormFieldModule,
        MatDividerModule,
        MatInputModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatStepperModule,
        MatSelectModule,
        MatSnackBarModule,
        ReactiveFormsModule,
        HttpClientModule,
        JwtModule.forRoot({
          config: {
            tokenGetter: () => {
              return '';
            }
          }
        })
      ],
      providers: [JwtHelperService],
      declarations: [ CreateworkrequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateworkrequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //This tests to make sure the asynchronous functions to add the tasks are ran.
  it('should submit task', () => {
    spyOn(component, 'submitRequest').and.callThrough();
    spyOn(component.taskService, 'createTask');
    component.submitRequest();
    expect(component.submitRequest).toHaveBeenCalled();
    expect(component.taskService.createTask).toHaveBeenCalled();
  });

  it('Should update tasks', () =>{
    let mockTasks: Array <String> = [
      '12345',
      '56789'
    ];

    let updateTask: TaskUpdate = {
      WorkRequestId: 'wr4257'
    };

    spyOn(component.taskService, 'updateTask').and.returnValue(of(console.log()));
    component.updateTasks(mockTasks, updateTask);
    expect(component.taskService.updateTask).toHaveBeenCalled();
  });

  it('Should trow a update task error', () => {
    let mockTasks: Array <String> = [
      '12345',
      '56789'
    ];

    let updateTask: TaskUpdate = {
      WorkRequestId: '1234'
    };
    spyOn(component.taskService, 'updateTask').and.throwError('status: 404');
    expect(component.taskService.updateTask).toThrowError('status: 404');
    expect(function(){component.updateTasks(mockTasks, updateTask)}).toThrowError('status: 404');
  });


  it('should get tools', () => {
    let tools = {
      result: ['Tool1','Tool2','Tool3']
    } as Tools;
    spyOn(component.toolsService, 'getTools').and.returnValue(of(tools));
    component.getTools();
    expect(component.toolsService.getTools).toHaveBeenCalled();
  });

  it('should get groups', () => {
    let groups = {
      result: ['Group1','Group2','Group3']
    } as Groups;
    spyOn(component.groupsService, 'getGroups').and.returnValue(of(groups));
    component.getGroups();
    expect(component.groupsService.getGroups).toHaveBeenCalled();
  });

  it('should get priorities', () => {
    let priorities = {
      result: ['Low','Medium','High']
    } as Priorities;
    spyOn(component.prioritiesService, 'getPriorities').and.returnValue(of(priorities));
    component.getPriorities();
    expect(component.prioritiesService.getPriorities).toHaveBeenCalled();
  });

  it('should get charge codes', () => {
    let codes = {
      result: [200,300,400]
    } as ChargeCodes;
    spyOn(component.chargeCodesService, 'getChargeCodes').and.returnValue(of(codes));
    component.getChargeCodes();
    expect(component.chargeCodesService.getChargeCodes).toHaveBeenCalled();
  });

  it('should get test locations', () => {
    let locations = {
      result: ['Houston','Austin','Dallas']
    } as TestLocations;
    spyOn(component.testLocationsService, 'getTestLocations').and.returnValue(of(locations));
    component.getTestLocations();
    expect(component.testLocationsService.getTestLocations).toHaveBeenCalled();
  });

  it('should get PSL companies', () => {
    let pslCompanies = {
      result: ['Company1','Company2','Company3']
    } as PslCompanies;
    spyOn(component.pslComaniesService, 'getPSLCompanies').and.returnValue(of(pslCompanies));
    component.getPslCompanies();
    expect(component.pslComaniesService.getPSLCompanies).toHaveBeenCalled();
  });

  it('should get requestor', () => {
    let requestor = {
      result: ['Requestor1','Requestor2','Requestor3']
    } as Requestors;
    spyOn(component.requestorService, 'getRequestors').and.returnValue(of(requestor));
    component.getRequestors();
    expect(component.requestorService.getRequestors).toHaveBeenCalled();
  });

  it('should get driver', () => {
    let drivers = {
      result: ['Driver1','Driver2','Driver3']
    } as RequestDriver;
    spyOn(component.requestDriversSerive, 'getRequestDriver').and.returnValue(of(drivers));
    component.getRequestDrivers();
    expect(component.requestDriversSerive.getRequestDriver).toHaveBeenCalled();
  });

  it('should get resources', () => {
    let resources = {
      result: ['Resource1','Resource2','Resource3']
    } as Resources;
    spyOn(component.resourcesService, 'getResources').and.returnValue(of(resources));
    component.getResources();
    expect(component.resourcesService.getResources).toHaveBeenCalled();
  });

  it('should get testContacts', () => {
    let testContacts = {
      result: ['contact1','contact2','contact3']
    } as TestContacts;
    spyOn(component.testContactsService, 'getTestContacts').and.returnValue(of(testContacts));
    component.getTestContacts();
    expect(component.testContactsService.getTestContacts).toHaveBeenCalled();
  });

  it(`should reset the form fields with one task`, async(() => {
    spyOn(component, 'addTask');
    component.resetTasks();
    expect(component.addTask).toHaveBeenCalled();
  }));

  it('deleteTask should remove a task when called', () => {
    let initialLength: number = component.tasksArray.length;
    component.deleteTask(initialLength-1);
    expect(component.tasksArray.length).toEqual(initialLength-1);
  });
});
