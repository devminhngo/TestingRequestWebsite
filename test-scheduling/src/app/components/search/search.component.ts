import { Component, OnInit } from '@angular/core';
import {Task} from "../../interfaces/task";
import {SearchService} from "../../services/search/search.service";
import {SearchResults} from "../../interfaces/search-results";
import {WorkRequest} from "../../interfaces/work-request";
import {MatDialog, MatTableDataSource} from "@angular/material";
import {ViewworkrequestComponent} from "../workrequests/viewworkrequest/viewworkrequest.component";
import {debounceTime, distinctUntilChanged} from "rxjs/operators";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  workRequestsResults: Array <WorkRequest> = [];
  workRequestTableData = new MatTableDataSource;
  workRequestColumns: string[] = ['id', 'requestor', 'driver', 'status'];
  workRequestColumnNames: string[] = ['Request ID', 'Requestor', 'Driver', 'Status'];
  tasksResults: Array<Task> = [];
  tasksTableData = new MatTableDataSource;
  tasksColumns: string[] = ['id', 'tool', 'testContact', 'resource'];
  tasksColumnsNames: string[] = ['Task ID','Tool', 'Test Contact', 'Resource'];
  searchField = new FormControl();
  searBarValue: string;

  constructor(
    public searchService: SearchService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.searchField.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(term => {
        this.search(term);
      });
  }

    search(searchString: string) : void{
    if(searchString.trim().length > 0)
    {
      this.searchService.getSearchResults(searchString)
        .subscribe((responseData: SearchResults) => {
          this.workRequestsResults = []; //empty array
          for(let i=0; i < responseData[0].workrequest.length; i++)
          {
            this.workRequestsResults.push(responseData[0].workrequest[i]);
            this.workRequestTableData.data = this.workRequestsResults;
          }
          this.tasksResults = []; // empty array
          for(let i = 0; i < responseData[0].tasks.length; i++)
          {
            this.tasksResults.push(responseData[0].tasks[i]);
            this.tasksTableData.data = this.tasksResults;
          }
          this.searBarValue = searchString;
        });
    }else{
      this.workRequestsResults = [];
      this.workRequestTableData.data = this.workRequestsResults;
      this.tasksResults = [];
      this.tasksTableData.data = this.tasksResults;
      this.searBarValue = "";
    }
  }

  openDialog(workrequestid): void {
    const dialogRef = this.dialog.open(ViewworkrequestComponent, {
      width: '70%',
      height: '90%',
      data: {
        id: workrequestid
      }
    });
  }
}
