import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminpanelComponent } from './adminpanel.component';
import { ApproveworkrequestComponent } from '../workrequests/approveworkrequest/approveworkrequest.component';
import { MatCardModule, MatSelectModule, MatButtonModule, MatToolbarModule, MatSidenavModule, MatIconModule, MatListModule, MatInputModule, MatDividerModule, MatFormFieldModule, MatCheckboxModule, MatDatepickerModule, MatNativeDateModule, MatTableModule, MatPaginatorModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { JwtModule, JwtHelperService } from '@auth0/angular-jwt'; // changed

describe('AdminpanelComponent', () => {
  let component: AdminpanelComponent;
  let fixture: ComponentFixture<AdminpanelComponent>;

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
        JwtModule.forRoot({ // changed
          config: {
            tokenGetter: () => {
              return '';
            }
          }
        })
      ],
      providers: [JwtHelperService], // changed
      declarations: [
        AdminpanelComponent,
        ApproveworkrequestComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminpanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
