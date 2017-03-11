import { Answer } from "./Answer";
import { User } from "./User";

export class Question {
  constructor(
    public _id: string,
    public title: string,
    public description: string,
    public tags: string[],
    public rating: number,
    public answersCount: number,
    public views: number,
    public answers: Answer[],
    public user: User
  ) {}
}
