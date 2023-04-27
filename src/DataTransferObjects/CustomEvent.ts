import {Time} from "@angular/common";

export interface CustomEvent
{
  //Todo muss noch angepasst werden an das Objekt wie es im Backend steht!
  id?: number;
  name: string;
  description: string;
  startDate: Date;
  startTime: string;
  endDate: Date;
  endTime: string;
  location:string;
  isPublic:boolean;
  status?:string;
  type:string;

  imageSource?:string;

  eventSeriesId?:number;
  organizationId?:number;
}
