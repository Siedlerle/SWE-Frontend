import {Injectable} from "@angular/core";
import {Group} from "../../DataTransferObjects/Group";

@Injectable({
  providedIn: 'root'
})
export class GroupCardDataService {
  private group: Group;

  constructor() { }

  setCardData(data: Group) {
    this.group = data;
  }

  getCardData(): Group {
    return this.group;
  }
}
