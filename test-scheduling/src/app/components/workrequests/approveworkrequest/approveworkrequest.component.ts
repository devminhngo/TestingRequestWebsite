import {Component, OnInit, ViewChild} from '@angular/core';
import { WorkRequest } from "../../../interfaces/work-request";
import { WorkRequests } from '../../../interfaces/work-requests';
import { WorkRequestService } from '../../../services/work-request/work-request.service';
import { MatTable, PageEvent, MatTableDataSource, MatDialog } from "@angular/material";
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ViewworkrequestComponent } from '../viewworkrequest/viewworkrequest.component';
import {TaskService} from "../../../services/task/task.service";

@Component({
  selector: 'app-approveworkrequest',
  templateUrl: './approveworkrequest.component.html',
  styleUrls: ['./approveworkrequest.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],

})

export class ApproveworkrequestComponent implements OnInit {
  expandedElement: WorkRequest | null;
  tableDataSource = new MatTableDataSource;
  displayedColumns: string[] = ['requestor', 'testlocation', 'tool', 'chargecode', 'taskamount', 'createdAt', 'view'];
  workRequestsData: WorkRequests = {total: 0, limit: 0, skip: 0, data: []};


  @ViewChild(MatTable) table: MatTable<any>;

  //Mat Paginator Inputs
  length: Number = 10;
  pageSize: Number = 10;

  constructor(
    public workRequestService: WorkRequestService,
    public taskService: TaskService,
    public dialog: MatDialog
  ) {  }
  
  ngOnInit() {
    this.getData(0);
  }

  isDataAvailable: boolean = false;
// was not able to pass responseData directly to the WorkRequests interface for some reason. Had to initialize interface values to zero and then individually fill in.
  getData(skip: number): void {
    //Each page has 10 items. Page #-1 multiplied by 10 gives us the next 10 records.
    this.workRequestService.getPendingWorkRequests(skip*10)
      .subscribe((responseData: WorkRequests) => {
        this.workRequestsData.total = responseData['total'];
        this.workRequestsData.limit = responseData['limit'];
        this.workRequestsData.skip = responseData['skip'];
        for(let i = 0; i < responseData.data.length; i++)
        {
          this.workRequestsData.data.push(responseData.data[i]);
        }
        this.length = this.workRequestsData.total;
        this.tableDataSource.data = this.workRequestsData.data;
        this.isDataAvailable = true;
      });
  }

  configurePaginator(event?:PageEvent) {
    this.workRequestsData.data = []; //clear all data in the data source.
    this.getData(event.pageIndex);
    this.table.renderRows();
    return event;
  }

  applyFilter(filterValue: string) {
    this.tableDataSource.filter = filterValue.trim().toLowerCase();
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
