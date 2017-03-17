import { Component, OnInit } from '@angular/core';
import { User } from "../../model/User";
import { UserService} from '../services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  providers: [UserService],
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  private users: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.getUsers();
  }

  private getUsers() {
    this.userService.getUsers().subscribe(
      users => this.users = users,
      error => console.log(error)
    );
  }
}
