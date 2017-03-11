import { User } from "./User";

export class Answer {
  constructor(
    public _id: string,
    public _question: string,
    public text: string,
    public rating: number,
    public user: User
  ) {}
}
