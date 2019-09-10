import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewworkrequestComponent } from './viewworkrequest.component';
import { MatCardModule, MatExpansionModule, MatDividerModule, MatIconModule, MatDialogModule, MatSnackBarModule } from '@angular/material';
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Task } from '../../../interfaces/task';
import { of } from 'rxjs';
import {WorkRequest} from "../../../interfaces/work-request";
import {RouterTestingModule} from "@angular/router/testing";
import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';
import { RealTimeDataGraphComponent } from '../../../modules/data-graph/components/real-time-data-graph/real-time-data-graph.component';
import { ChartsModule } from 'ng2-charts';


describe('ViewworkrequestComponent', () => {
  let component: ViewworkrequestComponent;
  let fixture: ComponentFixture<ViewworkrequestComponent>;

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
        MatDialogModule,
        MatSnackBarModule,
        JwtModule.forRoot({
          config: {
            tokenGetter: () => {
              return '';
            }
          }
        }),
        ChartsModule
      ],
      providers: [JwtHelperService],
      declarations: [ ViewworkrequestComponent, RealTimeDataGraphComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewworkrequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getData should get all pending work orders', () => {
    let mockWorkRequest = {
      _id:'Test',
      tasks: [],
      driver: 'Test',
      testdescription: 'Test',
      tool: 'Test',
      testlocation: 'Test',
      testcontact: 'Test',
      pslparticipation: false,
      priority: 'Test',
      duration: 'Test',
      resource: 'Test',
      requestcomments: 'Test',
      createdAt:null,
      requestor: 'Test',
      chargecode: 0,
      status: 'Test',
      companypsl: 'Test',
      description: 'Test',
      group: 'Test',
      id: 'Test'
    } as WorkRequest;

    spyOn(component.workRequestService, 'getWorkRequest').and.returnValue(of(mockWorkRequest));
    spyOn(component, 'getData').and.callThrough();
    spyOn(component,'getTasks');
    component.getData('ID');
    expect(component.workRequestService.getWorkRequest).toHaveBeenCalled();
    expect(component.getData).toHaveBeenCalled();
    expect(component.getTasks).toHaveBeenCalled();
  });

  it('getTasks should show tasks as available', () => {
    let mockTask: Task = {
      '_id': 's',
      'tool': 's',
      'resource': 's',
      'duration': 's',
      'priority': 's',
      'companyPSL': 's',
      'group': 's',
      'PSLParticipation': true,
      'testDescription': 's',
      'startdate': new Date(),
      'enddate': new Date(),
      'status': 's',
      'id': 's'
    };

    spyOn(component.taskRequestService, 'getTask').and.returnValue(of(mockTask));
    spyOn(component, 'getTasks').and.callThrough();
    component.workRequest.tasks = ['a'];
    component.getTasks();
    expect(component.getTasks).toHaveBeenCalled();
    expect(component.areTasksAvailable).toBeTruthy();
    spyOn(component, 'approveall').and.callThrough();
    component.approveall();
    spyOn(component, 'denyall').and.callThrough();
    component.denyall('test reason');
  });

  it('should go back to the approve panel', () => {
    spyOn(component, 'goBack').and.callThrough();
    component.goBack();
    expect(component.goBack).toHaveBeenCalled();
  });

  it('should close dialog', () => {
    spyOn(component, 'closeDialog').and.callThrough();
    component.closeDialog();
    expect(component.closeDialog).toHaveBeenCalled();
  });

});
