import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserToOrganisationComponent } from './add-user-to-organisation.component';

describe('AddUserToOrganisationComponent', () => {
  let component: AddUserToOrganisationComponent;
  let fixture: ComponentFixture<AddUserToOrganisationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUserToOrganisationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUserToOrganisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
