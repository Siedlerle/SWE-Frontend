import {Time} from "@angular/common";

export interface Preset {
  id?: number;
  name: string;
  type: string;
  description: string;
  image: File;
  location: string;
  startDate: Date;
  startTime: Time;
  endDate: Date;
  endTime: Time;
}
