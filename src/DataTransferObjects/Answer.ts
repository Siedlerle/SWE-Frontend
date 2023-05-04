import {Question} from "./Question";

export interface Answer {
  id? : number;
  question: Question;
  text? : string;
  amount?:number;
}
