import { TestBed, inject } from '@angular/core/testing';
import { AuthenticationService } from './authentication.service';
import { HttpTestingController, HttpClientTestingModule } from "@angular/common/http/testing";
import { HttpClientModule } from '@angular/common/http';
import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';

//import { JwtHelperService } from '@auth0/angular-jwt';

describe('AuthenticationService', () => {


  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
      HttpClientModule,
      JwtModule.forRoot({
        config: {
          tokenGetter: () => {
            return '';
          }
        }
      })
    ],
    providers: [AuthenticationService, JwtHelperService]
  }));
  let jwtHelper: JwtHelperService;

  //const helper = new JwtHelperService();

  it('should be created', () => {
    const service: AuthenticationService = TestBed.get(AuthenticationService);

    expect(service).toBeTruthy();
  });

  it('isUserLoggedIn() should return true for user logged in', inject([HttpTestingController, AuthenticationService], (service: AuthenticationService) => {
    //let jwtHelper: JwtHelperService = new JwtHelperService();
    const service2: AuthenticationService = TestBed.get(AuthenticationService);

    localStorage.setItem('accessToken', "000");
    expect(service2.isUserLoggedIn()).toBeTruthy();
    localStorage.removeItem('accessToken');
  }));

  it('isAdmin() should return true for 506 gid', inject([HttpTestingController, AuthenticationService], (service: AuthenticationService) => {
    const service3: AuthenticationService = TestBed.get(AuthenticationService);

    localStorage.setItem('gid', "506");
    expect(service3.isAdmin()).toBeTruthy();
    localStorage.removeItem('gid');
  }));

  it('isSuperAdmin() should return true for 506 gid', inject([HttpTestingController, AuthenticationService], (service: AuthenticationService) => {
    const service4: AuthenticationService = TestBed.get(AuthenticationService);

    localStorage.setItem('gid', "506");
    expect(service4.isSuperAdmin()).toBeTruthy();
    localStorage.removeItem('gid');
  }));

  it('isManager() should return true for 505 gid', inject([HttpTestingController, AuthenticationService], (service: AuthenticationService) => {
    const service5: AuthenticationService = TestBed.get(AuthenticationService);
    localStorage.setItem('gid', "505");
    expect(service5.isManager()).toBeTruthy();
    localStorage.removeItem('gid');
  }));

  it('isRequestor() should return true for 501 gid', inject([HttpTestingController, AuthenticationService], (service: AuthenticationService) => {
    const service6: AuthenticationService = TestBed.get(AuthenticationService);
    localStorage.setItem('gid', "501");
    expect(service6.isRequestor()).toBeTruthy();
    localStorage.removeItem('gid');
  }));

  it('getUserName() should return username TESTNAME', inject([HttpTestingController, AuthenticationService], (service: AuthenticationService) => {
    const service7: AuthenticationService = TestBed.get(AuthenticationService);
    localStorage.setItem('userid', "TESTNAME");
    expect(service7.getUserName()).toEqual("TESTNAME");
    localStorage.removeItem('userid');
  }));

  it('getGid() should return username 001', inject([HttpTestingController, AuthenticationService], (service: AuthenticationService) => {
    const service8: AuthenticationService = TestBed.get(AuthenticationService);
    localStorage.setItem('gid', "001");
    expect(service8.getGid()).toEqual("001");
    localStorage.removeItem('gid');
  }));


});
