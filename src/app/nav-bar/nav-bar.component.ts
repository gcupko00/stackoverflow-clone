import { Component } from '@angular/core';
import { AuthGuardService } from '../services/auth-guard.service';
import { LoginService } from '../services/login.service';
import {SearchService} from "../services/search.service";
import {Question} from "../../model/Question";

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  providers: [AuthGuardService, LoginService, SearchService],
  styleUrls: ['./nav-bar.component.css']
})

export class NavBarComponent {
  private searchTerm: String = "";
  private questions: Question[] = [];

  constructor(
    private authGuardService: AuthGuardService,
    private loginService: LoginService,
    private searchService: SearchService
  ) { }

  public isCollapsed: boolean = true;

  public onResize(event) {
    if (event.target.innerWidth >= 768) {
      this.isCollapsed = true;
    }
  }

  private previewSearch() {
    if (this.searchTerm.length < 1) {
      this.questions = [];
      return;
    }
    this.searchService.getPreviewResults(this.searchTerm).subscribe(
      questions => this.questions = questions,
      error => console.log(error)
    );
  }

  private resetSearch() {
    this.searchTerm = "";
    this.questions = [];
  }
}
