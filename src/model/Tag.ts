import {Question} from "./Question";
export class Tag {
  constructor(
    public _id: Number,
    public name: String,
    public description: String,
    public questionCount: Number,
    public questions: Question[]
  ) {}
}
