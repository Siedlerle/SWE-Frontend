import {QuestionType} from "./QuestionType";

export interface Question {
  id?: number;
  questionText: string;
  questionType: QuestionType;
  answerString?: string[];
}
