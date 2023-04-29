import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventCardInvitationComponent } from './event-card-invitation.component';

describe('EventCardInvitationComponent', () => {
  let component: EventCardInvitationComponent;
  let fixture: ComponentFixture<EventCardInvitationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventCardInvitationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventCardInvitationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
