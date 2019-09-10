import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { MatButtonModule, MatIconModule, MatListModule, MatSidenavModule, MatToolbarModule, MatMenuModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';
import { NavigationComponent } from './navigation.component';
import { NotificationsComponent } from '../notifications/notifications.component';
import { SimpleNotificationsModule } from 'angular2-notifications';


describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavigationComponent, NotificationsComponent ],
      imports: [
        NoopAnimationsModule,
        LayoutModule,
        MatButtonModule,
        MatIconModule,
        MatListModule,
        MatSidenavModule,
        MatToolbarModule,
        MatMenuModule,
        RouterTestingModule,
        HttpClientModule,
        SimpleNotificationsModule.forRoot(),
        JwtModule.forRoot({
          config: {
            tokenGetter: () => {
              return '';
            }
          }
        })
      ],
      providers: [
        JwtHelperService,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'Navigation'`, (() => {
    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.debugElement.componentInstance;
    expect(component.title).toEqual('Navigation');
  }));

  it(`should toggle sidemenu`, (() => {
    component.isOpen = false;
    component.toggle();
    expect(component.isOpen).toBeTruthy();
    expect(component.showWorkRequestSubMenu).toBeFalsy();
  }));

  it(`should close work request submenu`, (() => {
    component.showWorkRequestSubMenu = true;
    component.closesubmenus();
    expect(component.showWorkRequestSubMenu).toBeFalsy();
  }));

  it(`should leave work request submenu closed`, (() => {
    component.showWorkRequestSubMenu = false;
    component.closesubmenus();
    expect(component.showWorkRequestSubMenu).toBeFalsy();
  }));

  it(`should toggle work request submenu`, (() => {
    component.showWorkRequestSubMenu = true;
    component.toggleWorkRequestSubMenu();
    expect(component.showWorkRequestSubMenu).toBeFalsy();
    component.toggleWorkRequestSubMenu();
    expect(component.showWorkRequestSubMenu).toBeTruthy();
  }));

  it(`should toggle the sidebar from the work request icon`, (() => {
    component.isOpen = false;
    component.toggleWorkRequestSubMenu();
    expect(component.isOpen).toBeTruthy();
    expect(component.showWorkRequestSubMenu).toBeTruthy();
  }));

});import { from } from 'rxjs';

