export interface Event
{
  id?: number;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  location:string;

  inviteText:string;
  organizationId?:number;
}
