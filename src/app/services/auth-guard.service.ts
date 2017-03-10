import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private router: Router) { }

  public isLoggedIn() {
    if (localStorage.getItem('currentUser'))
      return true;

    return false;
  }

  public canActivate() {
    if (this.isLoggedIn())
      return true;

    this.router.navigate(['/login']);
    return false;
  }

  public getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser'));
  }

  public getUser() {
    return JSON.parse(localStorage.getItem('user'))
  }
}
