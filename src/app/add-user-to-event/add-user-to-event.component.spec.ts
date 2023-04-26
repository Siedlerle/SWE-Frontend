import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserToEventComponent } from './add-user-to-event.component';

describe('AddUserToEventComponent', () => {
  let component: AddUserToEventComponent;
  let fixture: ComponentFixture<AddUserToEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUserToEventComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUserToEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
