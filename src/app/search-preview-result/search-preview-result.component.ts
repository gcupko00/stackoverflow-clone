import {Component, OnInit, Input} from '@angular/core';
import {Question} from "../../model/Question";
import {Router} from "@angular/router";

@Component({
  selector: 'app-search-preview-result',
  templateUrl: './search-preview-result.component.html',
  styleUrls: ['./search-preview-result.component.css']
})
export class SearchPreviewResultComponent implements OnInit {
  @Input() public question: Question;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  private onSelect() {
    console.log(this.question._id);
    this.router.navigate(['/question', this.question._id]);
  }
}
