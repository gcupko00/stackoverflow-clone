import { Question } from "./Question";
import { Answer } from "./Answer";

export class User {
  constructor(
    public _id: string,
    public username: string,
    public email: string,
    public password: string,
    public imageUrl: string,
    public reputation: number,
    public questions: Question[],
    public answers: Answer[]
  ) {}
}
