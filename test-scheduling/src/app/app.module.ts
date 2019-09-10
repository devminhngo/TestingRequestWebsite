import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatToolbarModule, MatSidenavModule, MatIconModule, MatSelectModule, MatListModule, MatCardModule, MatInputModule, MatDividerModule, MatFormFieldModule, MatCheckboxModule, MatDatepickerModule, MatNativeDateModule, MatExpansionModule,MatStepperModule, MatTableModule, MatPaginatorModule, MatSnackBarModule, MatDialogModule, MatChipsModule, MatMenuModule} from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule } from '@angular/common/http';
import { NavigationComponent } from './components/navigation/navigation.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { WorkrequestsComponent } from './components/workrequests/workrequests.component';
import { CreateworkrequestComponent } from './components/workrequests/createworkrequest/createworkrequest.component';
import { ViewworkrequestComponent } from './components/workrequests/viewworkrequest/viewworkrequest.component';
import { SearchComponent } from './components/search/search.component';
import { ApproveworkrequestComponent } from './components/workrequests/approveworkrequest/approveworkrequest.component';
import { AdminpanelComponent } from './components/adminpanel/adminpanel.component';
import { ViewtaskComponent } from './components/tasks/viewtask/viewtask.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';
import { FullCalendarModule } from '@fullcalendar/angular';
import { DataGraphModule } from './modules/data-graph/data-graph.module';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { ChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavigationComponent,
    ScheduleComponent,
    TasksComponent,
    WorkrequestsComponent,
    CreateworkrequestComponent,
    ViewworkrequestComponent,
    SearchComponent,
    ApproveworkrequestComponent,
    FileUploadComponent,
    ViewtaskComponent,
    AdminpanelComponent,
    LoginComponent,
    LogoutComponent,
    NotificationsComponent,
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatFormFieldModule,
    MatDividerModule,
    MatInputModule,
    MatCheckboxModule,
    HttpClientModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatExpansionModule,
    MatTableModule,
    MatStepperModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatDialogModule,
    MatChipsModule,
    MatMenuModule,
    FullCalendarModule,
    SimpleNotificationsModule.forRoot(),
    ChartsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: function  tokenGetter() {
             return     localStorage.getItem('accessToken');},
        whitelistedDomains: ['localhost:4200'],
        blacklistedRoutes: ['']
      }
    }),
    DataGraphModule,
  ],
  providers: [JwtHelperService],
  bootstrap: [AppComponent]
})
export class AppModule { }
