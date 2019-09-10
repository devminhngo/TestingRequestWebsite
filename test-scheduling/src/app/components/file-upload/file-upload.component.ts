import { Component, OnInit, Injectable } from '@angular/core';
import { FileUploadServiceService} from '../../services/file-upload-service/file-upload-service.service';
import { Params, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { isHitsEqual } from '@fullcalendar/interaction/interactions/HitDragging';
@Injectable({
  providedIn: 'root'
})

export class taskFile {
  public taskId: string;
  public filedata;
  public filename: string;
}
@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css'],
})



export class FileUploadComponent implements OnInit {
  public uploadList: taskFile[];
  public currentTaskId: string;
  public taskFileList: taskFile[];
  public uploadFile: taskFile;
  constructor(private fileUploadService: FileUploadServiceService, private route:  ActivatedRoute, public http: HttpClient) { 
    this.taskFileList = new Array<taskFile>();
    this.uploadList = new Array<taskFile>();
    this.route.params.forEach((params: Params) => {
      this.currentTaskId = params['id'];
    });
    this.http.get("http://localhost:3030/file-upload?taskId=" + this.currentTaskId).subscribe(result => {
        this.taskFileList = result['data'];
    });

    this.uploadFile = new taskFile();
    
  }

  fileToUpload: File = null;
  
  jsonFile = '';
  async handleFileInput(files: FileList) {
    for( let i = 0;i<files.length;i++) {
      this.uploadFile = new taskFile();

      this.fileToUpload = files[i];

      var filedata = await this.getBase64(this.fileToUpload);
      this.uploadFile.filename = this.fileToUpload.name;
      this.uploadFile.filedata = filedata;
      this.uploadFile.taskId = this.currentTaskId;
      this.uploadList.push(this.uploadFile);
    }
      
    
  }
  async getBase64(file){
    return new Promise((resolve, reject) => {
      var reader = new FileReader();

      reader.onload = () => {
          
          resolve(reader.result);
      };
      reader.readAsDataURL(file);
  });
}
    
  async uploadFileToActivity() {
     for(let i = 0;i<this.uploadList.length;i++) {
   await this.fileUploadService.postFile(this.uploadList[i]).subscribe(data => {

    }, error => {
    });}
  }
  async downloadFile(filename) {
    var data = await this.http.get("http://localhost:3030/file-upload?filename=" + filename).subscribe(result => {
      const linkSource = result['data'][0]['filedata'];
      const downloadLink = document.createElement("a");
      const fileName = result['data'][0]['filename']

      downloadLink.href = linkSource;
      downloadLink.download = fileName;
      downloadLink.click();
    });
    
  }
  ngOnInit() {
  }
  
}
const httpOptions = {
  headers: new HttpHeaders({
    "content-type": "application/json"
  })
}
