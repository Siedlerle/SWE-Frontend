import { Injectable } from '@angular/core';
import {CustomEvent} from "../../DataTransferObjects/CustomEvent";

@Injectable({
  providedIn: 'root'

})
export class DataService {
  private eventData: CustomEvent;

  constructor() { }

  setCardData(data: CustomEvent) {
    this.eventData = data;
  }

  getCardData(): CustomEvent {
    return this.eventData;
  }
}
