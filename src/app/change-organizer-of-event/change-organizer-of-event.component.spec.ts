import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeOrganizerOfEventComponent } from './change-organizer-of-event.component';

describe('ChangeOrganizerOfEventComponent', () => {
  let component: ChangeOrganizerOfEventComponent;
  let fixture: ComponentFixture<ChangeOrganizerOfEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeOrganizerOfEventComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeOrganizerOfEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
