import {Component, OnInit, Input} from '@angular/core';
import {Answer} from "../../model/Answer";
import {AnswerService} from "../services/answer.service";
import {AuthGuardService} from "../services/auth-guard.service";

@Component({
  selector: 'answer',
  templateUrl: './answer.component.html',
  providers: [AnswerService],
  styleUrls: ['./answer.component.css']
})
export class AnswerComponent {
  @Input() public answer: Answer;

  constructor(
    private answerService: AnswerService,
    private authGuardService: AuthGuardService
  ) { }

  rateAnswer(upDown: number) {
    if (!this.authGuardService.isLoggedIn()) return;

    this.answerService.rateAnswer(this.answer._id, upDown).subscribe(
      status => {
        if (upDown < 0) this.answer.rating--;
        else this.answer.rating++;
      },
      error => console.log(error)
    );
  }
}
