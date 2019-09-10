import { TestBed, inject } from '@angular/core/testing';
import { RoleGuardService } from './roleguard.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpTestingController, HttpClientTestingModule } from "@angular/common/http/testing";
import { HttpClientModule } from '@angular/common/http';
import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';

describe('RoleguardService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      RouterTestingModule,
      HttpClientModule,
      HttpClientTestingModule,
      JwtModule.forRoot({
        config: {
          tokenGetter: () => {
            return '';
          }
        }
      })
    ]
  }));



  it('should be created', () => {
    const service: RoleGuardService = TestBed.get(RoleGuardService);
    expect(service).toBeTruthy();
  });

  it('canActivate() should return true then false', inject([HttpTestingController, RoleGuardService], (service: RoleGuardService) => {
    const service2: RoleGuardService = TestBed.get(RoleGuardService);
    localStorage.setItem('accessToken', "000");
    localStorage.setItem('gid', "505");
    expect(service2.canActivate()).toBeTruthy();
    localStorage.removeItem('accesstoken');
    localStorage.removeItem('gid');
    expect(service2.canActivate()).toBeFalsy();
  }));


});
