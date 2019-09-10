import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { CreateworkrequestComponent } from './components/workrequests/createworkrequest/createworkrequest.component';
import { ViewworkrequestComponent } from './components/workrequests/viewworkrequest/viewworkrequest.component';
import { ViewtaskComponent } from './components/tasks/viewtask/viewtask.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { SearchComponent } from './components/search/search.component';
import { AdminpanelComponent } from './components/adminpanel/adminpanel.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { AuthGuardService } from './services/authguard/authguard.service';
import { RoleGuardService } from './services/roleguard/roleguard.service';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate:[AuthGuardService] },
  { path: 'search', component: SearchComponent, canActivate:[AuthGuardService] },
  { path: 'createworkrequest', component: CreateworkrequestComponent, canActivate:[AuthGuardService] },
  { path: 'viewworkrequest/:id', component: ViewworkrequestComponent, canActivate:[AuthGuardService] },
  { path: 'viewtask/:id', component: ViewtaskComponent, canActivate:[AuthGuardService] },
  { path: 'schedule', component: ScheduleComponent, canActivate:[AuthGuardService] },
  { path: 'adminpanel', component: AdminpanelComponent, canActivate:[RoleGuardService] },
  { path: 'login', component: LoginComponent},
  { path: 'logout', component: LogoutComponent, canActivate:[AuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
