import {Question} from "./Question";

export interface Answer {
  id? : number;
  text? : string;
  question: Question;
}
