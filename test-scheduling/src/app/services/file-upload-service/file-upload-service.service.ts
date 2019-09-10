import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'q';
import { FileDetector } from 'selenium-webdriver/remote';
//import { currentId } from 'async_hooks';

@Injectable({
  providedIn: 'root'
})
export class fileDoc {
  public filedata;
  public filename: string;
  public taskId: String = "null";
}

@Injectable({
  providedIn: 'root'
})
export class FileUploadServiceService {
  public fileList: Array<fileDoc>;
  public ListFileList: Array<Array<fileDoc>>;
  public currentfile: fileDoc;

  constructor(private httpClient: HttpClient) {
      this.currentfile = new fileDoc();
      this.fileList = new Array<fileDoc>();
      this.ListFileList = new Array<Array<fileDoc>>();
   };

   
  async handleFileInput(files: FileList) {
    this.fileList = new Array<fileDoc>();
    //var filedata = await this.getBase64(files.item(0));
    for(let i = 0;i<files.length;i++) {
      this.currentfile = new fileDoc();
      this.currentfile.filedata = await this.getBase64(files[i]);
      this.currentfile.filename = files[i].name;
      this.fileList.push(this.currentfile);
    }
    
   // this.jsonFile = '{"name":"' + files.item(0).name + '","data":"' + filedata + '"}';    
  };

  addFileDoc(index) {
    this.ListFileList[index] = this.fileList;
   // this.fileList.splice(index,0,this.currentfile);
  };
  removeFileDoc(index) {
    this.fileList.splice(index,1);
  };
   
  async getBase64(file){
    return new Promise((resolve, reject) => {
      var reader = new FileReader();

      reader.onload = () => {
          
          resolve(reader.result);
      };
      reader.readAsDataURL(file);
  });
 };

   postFile(fileToUpload) {
    return this.httpClient.post("http://localhost:3030/file-upload", fileToUpload,httpOptions);
  }

}
const httpOptions = {
  headers: new HttpHeaders({
    "content-type": "application/json"
  })
};
