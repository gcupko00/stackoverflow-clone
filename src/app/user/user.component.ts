import { Component } from '@angular/core';
import { AuthGuardService } from '../services/auth-guard.service';
import { UserService } from '../services/user.service';
import { LoginService } from '../services/login.service';
import { User } from "../../model/User";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  providers: [AuthGuardService, UserService, LoginService],
  styleUrls: ['./user.component.css']
})

export class UserComponent {
  private user: User;
  private newImgUrl: string = "";

  private changeProfileImg: boolean = false;
  private imgUrlWarn: boolean = false;

  private deleteProfile: boolean = false;
  private passwordWarn: boolean = false;


  constructor(private authGuardService: AuthGuardService, private userService: UserService,
              private loginService: LoginService) {
    if(authGuardService.canActivate()) {
      this.user = authGuardService.getUser();
    }
  };

  private toggleChangeProfileImg() {
    this.changeProfileImg = !this.changeProfileImg;
    this.imgUrlWarn = false;
  };

  private toggleDeleteProfile() {
    this.deleteProfile = !this.deleteProfile;
    this.passwordWarn = false;
  };

  private postNewProfileImg(inputImgUrl: HTMLInputElement) {
    this.newImgUrl = inputImgUrl.value;

    if (this.newImgUrl.length < 6) {
      this.imgUrlWarn = true;
      return;
    }

    this.userService.postImgUrl(this.newImgUrl).subscribe(
      res => {
        localStorage.removeItem('user');
        localStorage.setItem('user', JSON.stringify(res.user));
        this.user = res.user;
      },
      error => {
        console.log(error);
      }
    );

    this.toggleChangeProfileImg();
  };

  private hideImgUrlWarn() {
    this.imgUrlWarn = false;
  };

  private hidePasswordWarn() {
    this.passwordWarn = false;
  };

  private postDeleteProfile(inputPassword: HTMLInputElement) {
    /* Activate deleteProfile menu */
    if (!this.deleteProfile) {
      this.toggleDeleteProfile();
      return;
    }

    /* Get info from deleteProfile menu and post it to server */
    if(inputPassword.value.length < 4) {
      this.passwordWarn = true;
      return;
    }

    this.userService.postDeleteUser().subscribe(
      res => {
        if (res.status == 200)
          this.loginService.logout();
        else
          this.passwordWarn = true;
      },
      error => {
        console.log(error);
      }
    );
  };
}
