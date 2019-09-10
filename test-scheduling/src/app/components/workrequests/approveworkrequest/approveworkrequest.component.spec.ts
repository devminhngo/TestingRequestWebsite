import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveworkrequestComponent } from './approveworkrequest.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatToolbarModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatCardModule,
  MatInputModule,
  MatDividerModule,
  MatFormFieldModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatTableModule,
  MatPaginatorModule,
  PageEvent
} from '@angular/material';
import { MatSelectModule } from '@angular/material/select';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import {Observable, of, throwError} from "rxjs";
import {trigger} from "@angular/animations";
import {TaskService} from "../../../services/task/task.service";
import {TaskUpdate} from "../../../interfaces/task-update";
import {WorkRequests} from "../../../interfaces/work-requests";
import {WorkRequest} from "../../../interfaces/work-request";
import {WorkRequestService} from "../../../services/work-request/work-request.service";
import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';

describe('ApproveworkrequestComponent', () => {
  let component: ApproveworkrequestComponent;
  let fixture: ComponentFixture<ApproveworkrequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
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
        MatSelectModule,
        HttpClientModule,
        MatTableModule,
        MatPaginatorModule,
        RouterModule,
        JwtModule.forRoot({
          config: {
            tokenGetter: () => {
              return '';
            }
          }
        })
      ],
      declarations: [ ApproveworkrequestComponent ],
      providers: [JwtHelperService],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveworkrequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get Data', ()=> {
    let mockWorkRequest = {} as WorkRequest;

    let mockWorkRequests = {
      total: 1,
      skip: 1,
      limit: 1,
      data: []
    } as WorkRequests;
    mockWorkRequests.data.push(mockWorkRequest);

    spyOn(component.workRequestService, 'getPendingWorkRequests').and.returnValue(of(mockWorkRequests));
    component.getData(0);
    expect(component.workRequestService.getPendingWorkRequests).toHaveBeenCalled();
  });


  it('should run paginator', () => {

  });

});
