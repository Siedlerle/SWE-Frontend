import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'

})
export class DataService {
  private cardData: any;

  constructor() { }

  setCardData(data: any) {
    this.cardData = data;
  }

  getCardData() {
    return this.cardData;
  }
}
