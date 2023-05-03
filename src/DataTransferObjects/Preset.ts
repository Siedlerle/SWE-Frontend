import {Time} from "@angular/common";

export interface Preset {
  id?: number;
  name: string;
  type: string;
  description: string;
  image?: string;
  location: string;
  startDate: Date;
  startTime: string;
  endDate: Date;
  endTime: string;
}
