import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private router: Router) { }

  public isVisible() {
    if (localStorage.getItem('currentUser'))
      return true;

    return false;
  }

  public canActivate() {
    if (this.isVisible())
      return true;

    this.router.navigate(['/login']);
    return false;
  }
}
