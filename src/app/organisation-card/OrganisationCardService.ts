import { Injectable } from '@angular/core';
import {Organisation} from "../../DataTransferObjects/Organisation";

@Injectable({
  providedIn: 'root'

})
export class OrganisationCardService {
  private orgaData: Organisation;

  constructor() { }

  setCardData(data: Organisation) {
    this.orgaData = data;
  }

  getCardData(): Organisation {
    return this.orgaData;
  }
}
