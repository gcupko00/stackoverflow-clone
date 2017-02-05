import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public isCollapsed: boolean = true;

  public onResize(event) {
    if (event.target.innerWidth >= 768) {
      this.isCollapsed = true;
    }
  }
}
