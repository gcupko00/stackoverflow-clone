import { Component } from '@angular/core';
import { AuthGuardService } from '../services/auth-guard.service';
import { UserService } from '../services/user.service';
import { User } from "../../model/User";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  providers: [AuthGuardService, UserService],
  styleUrls: ['./user.component.css']
})

export class UserComponent {
  private user: User;

  private newImgUrl: string = "";
  private changeProfileImg: boolean = false;
  private imgUrlWarn: boolean = false;

  constructor(private authGuardService: AuthGuardService, private userService: UserService) {
    if(authGuardService.canActivate()) {
      this.user = authGuardService.getUser();

      console.log(this.user.username);
    }
  };

  private toggleChangeProfileImg() {
    this.changeProfileImg = !this.changeProfileImg;
    this.imgUrlWarn = false;
  };

  private postNewProfileImg(inputImgUrl: HTMLInputElement) {
    this.newImgUrl = inputImgUrl.value;

    if (this.newImgUrl.length < 6) {
      this.imgUrlWarn = true;
      return;
    }

    this.userService.postImgUrl(this.newImgUrl).subscribe(
      user => {
        console.log(user);
        //auth
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
}
