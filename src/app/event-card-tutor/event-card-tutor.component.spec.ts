import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventCardTutorComponent } from './event-card-tutor.component';

describe('EventCardTutorComponent', () => {
  let component: EventCardTutorComponent;
  let fixture: ComponentFixture<EventCardTutorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventCardTutorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventCardTutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
