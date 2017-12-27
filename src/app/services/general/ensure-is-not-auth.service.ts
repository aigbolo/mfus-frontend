import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class EnsureIsNotAuth implements CanActivate {

  constructor(private router: Router) { }


  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (localStorage.getItem('token')) {
      this.router.navigateByUrl('/change-password');
      return false;
    }
    else {
      return true;
    }
  }
}
