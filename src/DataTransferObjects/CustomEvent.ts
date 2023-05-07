import {Time} from "@angular/common";
import {EventSeries} from "./EventSeries";

export interface CustomEvent
{
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

  image?:string;

  eventSeries?: EventSeries;
  organizationId?:number;
}
