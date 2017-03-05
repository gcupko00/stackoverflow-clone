import { Component } from '@angular/core';
import { AuthGuardService } from '../services/auth-guard.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  providers: [AuthGuardService, LoginService],
  styleUrls: ['./nav-bar.component.css']
})

export class NavBarComponent {

  constructor(private authGuardService: AuthGuardService, private loginService: LoginService) { }

  public isCollapsed: boolean = true;

  public onResize(event) {
    if (event.target.innerWidth >= 768) {
      this.isCollapsed = true;
    }
  }
}
