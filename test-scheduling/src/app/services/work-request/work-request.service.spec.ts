import { TestBed, inject } from '@angular/core/testing';
import { WorkRequestService } from './work-request.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { WorkRequest } from 'src/app/interfaces/work-request';
import { NewWorkRequest } from 'src/app/interfaces/new-work-request';
import {WorkRequests} from "../../interfaces/work-requests";
import {WorkRequestUpdate} from "../../interfaces/work-request-update";

describe('NewWorkRequestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ]
    });
  });

  it('should be created', () => {
    const service: WorkRequestService = TestBed.get(WorkRequestService);
    expect(service).toBeTruthy();
  });

  it('expects to create work request', inject([HttpTestingController, WorkRequestService],
    (httpMock: HttpTestingController, service: WorkRequestService) => {
      let mockNewWorkRequest = {
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
      } as NewWorkRequest;

      let mockWorkRequest = {
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
      } as WorkRequest;

      service.createWorkRequest(mockNewWorkRequest).subscribe(result => {
        expect(result._id).toBeDefined();
      });

      const req = httpMock.expectOne('http://localhost:3030/requests/');
      expect(req.request.method).toEqual('POST');

      req.flush(mockWorkRequest);

      httpMock.verify();
    })
  );

  it('expects to retrieve work requests', inject([HttpTestingController, WorkRequestService],
    (httpMock: HttpTestingController, service: WorkRequestService) => {

      let mockWorkRequest = {
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
      } as WorkRequest;

      let mockWorkRequests = {
        total:1,
        limit:1,
        skip:0,
        data: []
      } as WorkRequests;

      mockWorkRequests.data.push(mockWorkRequest);

      service.getWorkRequests().subscribe(result => {
        expect(result).toBeTruthy();
        for(let i in result.data)
        {
          expect(result.data[i]._id).toBeDefined();
        }
        expect(result.total).toBe(1);
      });

      const req = httpMock.expectOne('http://localhost:3030/requests/');
      expect(req.request.method).toEqual('GET');

      req.flush(mockWorkRequests);

      httpMock.verify();
    })
  );

  it('expects to retrieve a work request', inject([HttpTestingController, WorkRequestService],
    (httpMock: HttpTestingController, service: WorkRequestService) => {

      let mockWorkRequest = {
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
      } as WorkRequest;

      service.getWorkRequest("12345").subscribe(result => {
        expect(result).toBeDefined();
        expect(result).toBe(mockWorkRequest);
      });

      const req = httpMock.expectOne('http://localhost:3030/requests/12345');
      expect(req.request.method).toEqual('GET');

      req.flush(mockWorkRequest);

      httpMock.verify();
    })
  );
  it('expects to update work request', inject([HttpTestingController, WorkRequestService],
    (httpMock: HttpTestingController, service: WorkRequestService) => {

      let update = {
        'status': 'denied'
      } as WorkRequestUpdate;

      service.updateWorkRequest('1234',update).subscribe(result => {
        expect(result).toBeTruthy();
        expect(result.status).toBe('denied');
      });

      const req = httpMock.expectOne('http://localhost:3030/requests/1234');
      expect(req.request.method).toEqual('PATCH');
      req.flush({status: 'denied'});

      httpMock.verify();
    })
  );
});
