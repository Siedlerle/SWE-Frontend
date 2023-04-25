import { Component } from '@angular/core';
import { listData } from './event-list';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],

})



export class HomepageComponent {
  public onCardClick(evt: MouseEvent){
    console.log(evt);
  }

  eventlist = listData;

  showCard = false;
  openCard(){
    this.showCard = true;
  }
  closeCard(){
    this.showCard = false;
  }
}
