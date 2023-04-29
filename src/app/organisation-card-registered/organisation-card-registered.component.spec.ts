import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganisationCardRegisteredComponent } from './organisation-card-registered.component';

describe('OrganisationCardRegisteredComponent', () => {
  let component: OrganisationCardRegisteredComponent;
  let fixture: ComponentFixture<OrganisationCardRegisteredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganisationCardRegisteredComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrganisationCardRegisteredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
