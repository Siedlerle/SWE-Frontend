import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventUnregistryComponent } from './event-unregistry.component';

describe('EventUnregistryComponent', () => {
  let component: EventUnregistryComponent;
  let fixture: ComponentFixture<EventUnregistryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventUnregistryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventUnregistryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
