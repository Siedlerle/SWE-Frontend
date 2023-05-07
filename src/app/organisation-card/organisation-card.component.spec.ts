import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganisationCardComponent } from './organisation-card.component';

describe('OrganisationCardComponent', () => {
  let component: OrganisationCardComponent;
  let fixture: ComponentFixture<OrganisationCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganisationCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrganisationCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
