import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventLeaveDialogComponent } from './event-leave-dialog.component';

describe('EventLeaveDialogComponent', () => {
  let component: EventLeaveDialogComponent;
  let fixture: ComponentFixture<EventLeaveDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventLeaveDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventLeaveDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
