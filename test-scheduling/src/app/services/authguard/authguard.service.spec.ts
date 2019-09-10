import { TestBed, inject } from '@angular/core/testing';

import { AuthGuardService } from './authguard.service';

import { RouterTestingModule } from '@angular/router/testing';
import { HttpTestingController, HttpClientTestingModule } from "@angular/common/http/testing";
import { HttpClientModule } from '@angular/common/http';
import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';

describe('AuthguardService', () => {

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      RouterTestingModule,
      HttpClientTestingModule,
      HttpClientModule,
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
    const service: AuthGuardService = TestBed.get(AuthGuardService);
    expect(service).toBeTruthy();
  });

  it('canActivate() should return true', inject([HttpTestingController, AuthGuardService], (service: AuthGuardService) => {
    const service2: AuthGuardService = TestBed.get(AuthGuardService);
    localStorage.setItem('accessToken', "000");
    expect(service2.canActivate()).toBeTruthy();
    //localStorage.removeItem('accesstoken');
    //expect(service2.canActivate()).toBeFalsy();
  }));


});