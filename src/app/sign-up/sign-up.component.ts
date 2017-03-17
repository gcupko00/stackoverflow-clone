import { Component } from '@angular/core';
import { SignupService } from "../services/signup.service";
import { Router } from "@angular/router";
import { User } from "../../model/User";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  providers: [SignupService],
  styleUrls: ['./sign-up.component.css']
})

export class SignUpComponent {
  private username: string = "";
  private email: string = "";
  private password: string = "";

  private usernameWarn: boolean = false;
  private passwordWarn: boolean = false;
  private emailWarn: boolean = false;
  private failedSignupWarn: boolean = false;

  constructor(
    private signupService: SignupService, private router: Router) { }

  private signup(inputUsername: HTMLInputElement, inputPassword: HTMLInputElement, inputEmail: HTMLInputElement) {
    this.username = inputUsername.value;
    this.password = inputPassword.value;
    this.email    = inputEmail.value;

    if (this.username.length < 4)
      this.usernameWarn = true;

    if (this.password.length < 4)
      this.passwordWarn = true;

    if (this.email.length < 4) /*TO-ADD !address.contains("@")*/
      this.emailWarn = true;

    if (this.usernameWarn || this.passwordWarn || this.emailWarn)
      return;

    let user = new User(null, this.username, this.email, this.password, "", 0, null, null);

    this.signupService.postUser(user).subscribe(
      user => {
        console.log(user);
        if (this.router.url == '/signup')
          this.router.navigate(['/home']);
        //auth
      },
      error => {
        console.log(error);
        this.failedSignupWarn = true;
      }
    );
  }

  private hideUsernameWarn() {
    this.usernameWarn = false;
    this.failedSignupWarn = false;
  };

  private hidePasswardWarn() {
    this.passwordWarn = false;
    this.failedSignupWarn = false;
  };

  private hideEmailWarn() {
    this.emailWarn = false;
    this.failedSignupWarn = false;
  };
}
