import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  private users: User[] = [];

  constructor() {
    this.users.push(new User("Ranko, 5, none"));
    this.users.push(new User("Ranko, 5, none"));
    this.users.push(new User("Ranko, 5, none"));
    this.users.push(new User("Ranko, 5, none"));
    this.users.push(new User("Ranko, 5, none"));
    this.users.push(new User("Ranko, 5, none"));
    this.users.push(new User("Ranko, 5, none"));
    this.users.push(new User("Ranko, 5, none"));
    this.users.push(new User("Ranko, 5, none"));
  }

  ngOnInit() {
  }

}

class User {
  public userName: string;
  public userReputation: number;
  public userImage: string;

  constructor(name: string = "", reputation: number = 0, image: string = "") {
    this.userName = name;
    this.userReputation = reputation;
    this.userImage = image;
  }
}
