import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganisationLeaveComponentComponent } from './organisation-leave-component.component';

describe('OrganisationLeaveComponentComponent', () => {
  let component: OrganisationLeaveComponentComponent;
  let fixture: ComponentFixture<OrganisationLeaveComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganisationLeaveComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrganisationLeaveComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
