import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganisationCardInvitationComponent } from './organisation-card-invitation.component';

describe('OrganisationCardInvitationComponent', () => {
  let component: OrganisationCardInvitationComponent;
  let fixture: ComponentFixture<OrganisationCardInvitationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganisationCardInvitationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrganisationCardInvitationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
