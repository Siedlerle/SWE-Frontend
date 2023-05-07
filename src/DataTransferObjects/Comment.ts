import {User} from "./User";

export interface Comment {
  id? : number;
  text?: string;
  user?: User;
}
