import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchComponent } from './search.component';
import {
  MatCardModule,
  MatDialog,
  MatDialogModule,
  MatFormFieldControl,
  MatFormFieldModule,
  MatInputModule,
  MatListModule,
  MatTableModule
} from '@angular/material';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {of} from "rxjs";
import {SearchResults} from "../../interfaces/search-results";
import {WorkRequest} from "../../interfaces/work-request";
import {Task} from "../../interfaces/task";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";


describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatCardModule,
        MatTableModule,
        MatFormFieldModule,
        HttpClientTestingModule,
        MatDialogModule,
        MatInputModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        MatListModule
      ],
      declarations: [ SearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get search results', () => {
    spyOn(component.searchService, 'getSearchResults').and.callThrough();
    component.search('testString');
    expect(component.searchService.getSearchResults).toHaveBeenCalled();
  })

});
