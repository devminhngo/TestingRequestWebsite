import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewtaskComponent } from './viewtask.component';
import { MatCardModule, MatExpansionModule, MatDividerModule, MatIconModule } from '@angular/material';
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { FileUploadComponent } from '../../file-upload/file-upload.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WorkRequestService } from '../../../services/work-request/work-request.service';
import { TaskService } from '../../../services/task/task.service';
import { ViewTask } from '../../../interfaces/view-task';
import { of } from 'rxjs';
import { WorkRequest } from '../../../interfaces/work-request';
import {RouterTestingModule} from "@angular/router/testing";
import { FullCalendarModule } from '@fullcalendar/angular';
import { JwtModule, JwtHelperService } from '@auth0/angular-jwt'; // changed
import { RealTimeDataGraphComponent } from '../../../modules/data-graph/components/real-time-data-graph/real-time-data-graph.component';
import { ChartsModule } from 'ng2-charts';

describe('ViewtaskComponent', () => {
  let component: ViewtaskComponent;
  let fixture: ComponentFixture<ViewtaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatCardModule,
        MatExpansionModule,
        MatDividerModule,
        MatIconModule,
        HttpClientModule,
        BrowserAnimationsModule,
        RouterTestingModule,
        FullCalendarModule,
        JwtModule.forRoot({ // changed
          config: {
            tokenGetter: () => {
              return '';
            }
          }
        }),
        ChartsModule
      ],
      providers: [JwtHelperService], // changed
      declarations: [ ViewtaskComponent, FileUploadComponent, RealTimeDataGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewtaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create view task component', () => {
    expect(component).toBeTruthy();
  });

  it('should call the getData function', () => {
    let mockTask: ViewTask = {
      '_id': 'id',
      'companyPSL': 'company',
      'createdAt': new Date(),
      'duration': '4',
      'enddate': new Date(),
      'group': 'group',
      'priority': 'high',
      'resource': 'resource',
      'selectedStartTime': ['1','1','AM'],
      'startdate': new Date(),
      'status': 'new',
      'testContact': 'test',
      'testDescription': 'test',
      'tool': 'tool',
      'WorkRequestId': 'test',
      'PSLParticipation': true,
      'id': 'test'
    };
    spyOn(component.taskRequestService, 'getTask').and.returnValue(of(mockTask));
    spyOn(component, 'getWorkRequest');
    component.getData('id');
    expect(component.taskRequestService.getTask).toHaveBeenCalled();
    expect(component.getWorkRequest).toHaveBeenCalled();
  });

  it('getWorkRequest should set the components work request', () => {
    let mockWorkRequest: WorkRequest = {
      chargecode: 1,
      companypsl: "Test",
      description: "Test",
      driver: "Test",
      duration: "Test",
      group: "Test",
      priority: "Test",
      pslparticipation: true,
      requestcomments: "Test",
      requestor: "Test",
      resource: "Test",
      tasks: ["Test"],
      testcontact: "Test",
      testdescription: "Test",
      testlocation: "Test",
      tool: "Test",
      _id: "Test",
      id: "Test",
      status: "Test",
      createdAt: new Date(),
    };

    component.task = {
      '_id': 'id',
      'companyPSL': 'company',
      'createdAt': new Date(),
      'duration': '4',
      'enddate': new Date(),
      'group': 'group',
      'priority': 'high',
      'resource': 'resource',
      'selectedStartTime': ['1','1','AM'],
      'startdate': new Date(),
      'status': 'new',
      'testContact': 'test',
      'testDescription': 'test',
      'tool': 'tool',
      'WorkRequestId': 'test',
      'PSLParticipation': true,
      'id': 'test'
    };

    spyOn(component.workRequestService, 'getWorkRequest').and.returnValue(of(mockWorkRequest));
    spyOn(component, 'workRequest');
    component.workRequest = undefined;
    component.getWorkRequest();
    expect(component.workRequestService.getWorkRequest).toHaveBeenCalled();
    expect(component.workRequest).not.toBe(undefined);
  });

  it('goBack should be called when the back button is clicked', () => {
    spyOn(component, 'goBack').and.callThrough();
    component.goBack();
    expect(component.goBack).toHaveBeenCalled();
  });

});
