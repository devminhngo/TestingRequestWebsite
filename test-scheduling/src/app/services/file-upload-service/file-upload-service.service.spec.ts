import { TestBed, inject } from '@angular/core/testing';

import {fileDoc, FileUploadServiceService} from './file-upload-service.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'

describe('FileUploadServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule
    ]
  }));

  it('should be created', () => {
    const service: FileUploadServiceService = TestBed.get(FileUploadServiceService);
    expect(service).toBeTruthy();
  });

  it('testing file upload service', inject([HttpTestingController, FileUploadServiceService],
    (httpMock: HttpTestingController, service: FileUploadServiceService) => {
      service.postFile({
        "name": "file",
        "data": "data:application/pdf;base64"
      }).subscribe(data => {
        expect(data).toBeTruthy();
        expect(data).toEqual({
          "name": "file",
          "data": "data:application/pdf;base64",
        });
      });

      const req = httpMock.expectOne('http://localhost:3030/file-upload');

      req.flush({
        "name": "file",
        "data": "data:application/pdf;base64",
      });
    })
  );

  it('should add file doc to array', () => {
    const service: FileUploadServiceService = TestBed.get(FileUploadServiceService);

  });

  it('should remove file doc', () => {

  });

  it('should getBase64', () => {

  });

});
