import { Component, OnInit } from '@angular/core';
import { User, SignupService } from "../signup.service";

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

  constructor(private signupService: SignupService) { }

  private signup(inputUsername: HTMLInputElement, inputPassword: HTMLInputElement, inputEmail: HTMLInputElement) {
    this.username = inputUsername.value;
    this.password = inputPassword.value;
    this.email = inputEmail.value;

    let user = new User(null, this.username, this.email, this.password, "", 0);

    console.log(user);

    this.signupService.postUser(user).subscribe(
      user => console.log(user),
      error => console.log(error)
    );
  }
}
