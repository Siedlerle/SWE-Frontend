import { Injectable } from '@angular/core';
import {CustomEvent} from "../../DataTransferObjects/CustomEvent";

@Injectable({
  providedIn: 'root'

})
export class DataService {
  private cardData: CustomEvent;

  constructor() { }

  setCardData(data: CustomEvent) {
    this.cardData = data;
  }

  getCardData() {
    return this.cardData;
  }
}
