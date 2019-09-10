import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})

export class RoleGuardService implements CanActivate {

  constructor(private router: Router,
    private authService: AuthenticationService) { }

    //canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    canActivate() {

      if (this.authService.isUserLoggedIn() && this.authService.isAdmin())
      return true;

      this.router.navigate(['']);
      return false;
    }  
}
