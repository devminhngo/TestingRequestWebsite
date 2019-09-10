import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleComponent } from './schedule.component';
import { MatCardModule } from '@angular/material';
import { FullCalendarModule } from '@fullcalendar/angular';
import { HttpClientModule } from "@angular/common/http";
import { RouterTestingModule } from "@angular/router/testing";
import { MatDialogModule } from '@angular/material';
import { JwtModule, JwtHelperService } from '@auth0/angular-jwt'; // changed


describe('ScheduleComponent', () => {
  let component: ScheduleComponent;
  let fixture: ComponentFixture<ScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatCardModule,
        FullCalendarModule,
        HttpClientModule,
        RouterTestingModule,
        MatDialogModule,
        JwtModule.forRoot({ // changed
          config: {
            tokenGetter: () => {
              return '';
            }
          }
        })
      ],
      providers: [JwtHelperService], // changed
      declarations: [ ScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
