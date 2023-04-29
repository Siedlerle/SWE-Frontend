import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventRegistryComponent } from './event-registry.component';

describe('EventRegistryComponent', () => {
  let component: EventRegistryComponent;
  let fixture: ComponentFixture<EventRegistryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventRegistryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventRegistryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
