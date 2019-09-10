import {inject, TestBed} from '@angular/core/testing';
import { TaskService } from './task.service';
import {HttpTestingController, HttpClientTestingModule} from "@angular/common/http/testing";
import {TaskUpdate} from "../../interfaces/task-update";
import {Task} from "../../interfaces/task";
import {NewTask} from "../../interfaces/new-task";
import {Tasks} from "../../interfaces/tasks";
import { JwtModule, JwtHelperService } from '@auth0/angular-jwt'; // changed


describe('TaskService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
      JwtModule.forRoot({ // changed
        config: {
          tokenGetter: () => {
            return '';
          }
        }
      })
    ],
    providers: [JwtHelperService] // changed
  }));

  it('should be created', () => {
    const service: TaskService = TestBed.get(TaskService);
    expect(service).toBeTruthy();
  });

  it('expects to add task', inject([HttpTestingController, TaskService],
    (httpMock: HttpTestingController, service: TaskService) => {

      let newMockTask = {
        tool: 'TEST',
        resource: 'TEST',
        duration: 'TEST',
        priority: 'TEST',
        testcontact: 'TEST',
        companypsl: 'TEST',
        enddate: null,
        group: 'TEST',
        pslparticipation: false,
        startdate: null,
        status: '',
        taskid: '',
        testdescription: 'TEST'
      } as NewTask;

      let mockTask = {
        _id:'TEST',
        priority:'TEST',
        duration:'TEST',
        resource: 'TEST',
        tool:'TEST',
        status:'',
        enddate: null,
        startdate: null,
        testDescription:'TEST',
        group:'TEST',
        companyPSL:'TEST',
        PSLParticipation: false,
        id: 'TEST'
      } as Task;

      service.createTask(newMockTask).subscribe(result => {
        expect(result).toBeTruthy();
        expect(result._id).toBeDefined();
      });

      const req = httpMock.expectOne('http://localhost:3030/tasks/');
      expect(req.request.method).toEqual('POST');
      req.flush(mockTask);

      httpMock.verify();
    })
  );

  it('expects to get tasks', inject([HttpTestingController, TaskService],
    (httpMock: HttpTestingController, service: TaskService) => {

    let mockTask = {
        _id:'TEST',
        priority:'TEST',
        duration:'TEST',
        resource: 'TEST',
        tool:'TEST',
        status:'',
        enddate: null,
        startdate: null,
        testDescription:'TEST',
        group:'TEST',
        companyPSL:'TEST',
        PSLParticipation: false,
        id: 'Test'
      } as Task;
        let mockTasks = {
        total: 1,
          limit:1,
          skip:1,
          data: []
        } as Tasks;

      mockTasks.data.push(mockTask);

      service.getTasks().subscribe(result => {
        expect(result).toBeTruthy();
        expect(result.total).toBe(1);
      });

      const req = httpMock.expectOne('http://localhost:3030/tasks/');
      expect(req.request.method).toEqual('GET');
      req.flush(mockTasks);

      httpMock.verify();
    })
  );

  it('expects to get pending tasks', inject([HttpTestingController, TaskService],
    (httpMock: HttpTestingController, service: TaskService) => {

      let mockTask = {
        _id:'TEST',
        priority:'TEST',
        duration:'TEST',
        resource: 'TEST',
        tool:'TEST',
        status:'requested',
        enddate: null,
        startdate: null,
        testDescription:'TEST',
        group:'TEST',
        companyPSL:'TEST',
        PSLParticipation: false,
        id: 'TEST'
      } as Task;
      let mockTasks = {
        total: 1,
        limit:1,
        skip:0,
        data: []
      } as Tasks;

      mockTasks.data.push(mockTask);

      service.getPendingTasks(0).subscribe(result => {
        expect(result).toBeTruthy();
        for(let i in result.data) {
          expect(result.data[i].status).toEqual('requested')
        }
        expect(result.total).toBe(1);
      });

      const req = httpMock.expectOne('http://localhost:3030/tasks/?status=requested&$skip=0');
      expect(req.request.method).toEqual('GET');
      req.flush(mockTasks);

      httpMock.verify();
    })
  );

  it('expects to update task status', inject([HttpTestingController, TaskService],
    (httpMock: HttpTestingController, service: TaskService) => {

      let update = {
        'status': 'denied'
      } as TaskUpdate;

      service.updateTask('1234',update).subscribe(result => {
        expect(result).toBeTruthy();
        expect(result.status).toBe('denied');
      });

      const req = httpMock.expectOne('http://localhost:3030/tasks/1234');
      expect(req.request.method).toEqual('PATCH');
      req.flush({status: 'denied'});

      httpMock.verify();
    })
  );

});
