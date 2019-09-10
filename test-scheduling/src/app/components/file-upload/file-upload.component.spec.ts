import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileUploadComponent } from './file-upload.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule, MatExpansionModule, MatDividerModule, MatIconModule } from '@angular/material';
import { HttpClientModule } from "@angular/common/http";
import { FileUploadServiceService } from '../../services/file-upload-service/file-upload-service.service';
import { Params, ActivatedRoute, Route } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('FileUploadComponent', () => {
  let component: FileUploadComponent;
  let fixture: ComponentFixture<FileUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ 
        MatCardModule,
        MatExpansionModule,
        MatDividerModule,
        MatIconModule,
        HttpClientModule,
        BrowserAnimationsModule,
        HttpClientTestingModule,
        
        RouterTestingModule
        
      ],
      declarations: [ FileUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('testing handleFileInput', () => {
    let fn = component.handleFileInput;
    let mock = new Blob([""], {"type": "text/html"});
    mock["lastModifiedDate"] = "";
    mock["name"] = "filename";
    const file = <File>mock;
    const fileList = {
      0: file,
      1: file,
      length: 2,
      item: (index: number) => file,
    };

    fn(fileList); // Call function handleFileInput
    expect(component.uploadFile).not.toBe(null);
    
  });

  it('testing base64', async () => {
    let mock = new Blob([""], {"type": "text/html"});
    mock["lastModifiedDate"] = "";
    mock["name"] = "filename";
    const file = <File>mock;
    let result = await component.getBase64(file);
    expect(result).not.toBe(null);
  });

  it('testing uploadFileToActivity', async() => {
    let mock = new Blob([""], {"type": "text/html"});
    mock["lastModifiedDate"] = "";
    mock["name"] = "filename";
    const file = <File>mock;
    let result =  await component.uploadFileToActivity();
    expect(result).not.toBe(null)
  });
  it('testing downloadFile', async() => {
    let mock = new Blob([""], {"type": "text/html"});
    mock["lastModifiedDate"] = "";
    mock["name"] = "filename";
    const file = <File>mock;
    let result =  await component.downloadFile("filename");
    expect(result).not.toBe(null)
  });
 

});
