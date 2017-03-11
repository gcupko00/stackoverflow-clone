import { Component } from '@angular/core';
import { LoginService } from "../services/login.service";
import { Router } from "@angular/router";
import { User } from "../../model/User";

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  providers: [LoginService],
  styleUrls: ['./log-in.component.css']
})

export class LogInComponent {
  private email: string = "";
  private password: string = "";

  private emailWarn: boolean = false;
  private passwordWarn: boolean = false;
  private failedLoginWarn: boolean = false;

  constructor(
    private loginService: LoginService,
    private router: Router)
  { }

  private login(inputPassword: HTMLInputElement, inputEmail: HTMLInputElement) {
    this.password = inputPassword.value;
    this.email = inputEmail.value;

    if (this.email.length < 4) /*TO-ADD !address.contains("@") - mislim da Angular 2 ili javascript
    ima već nešto ugrađeno za to, pa možeš to iskoristiti*/
      this.emailWarn = true;

    if (this.password.length < 4)
      this.passwordWarn = true;

    if (this.passwordWarn || this.emailWarn)
      return;

    let user = new User(null, "", this.email, this.password, "", 0, null, null);

    this.loginService.postUser(user).subscribe(
      jwtToken => {
        if (this.router.url == '/login')
         this.router.navigate(['/home']);
        //auth succ function
        //set route to home
      },
      error => {
        console.log(error);
        this.failedLoginWarn = true;
      }
    );
  }

  private hideEmailWarn() {
    this.emailWarn = false;
    this.failedLoginWarn = false;
  };

  private hidePasswardWarn() {
    this.passwordWarn = false;
    this.failedLoginWarn = false;
  };
}
