import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsermanagementInOrganisationComponent } from './usermanagement-in-organisation.component';

describe('UsermanagementInOrganisationComponent', () => {
  let component: UsermanagementInOrganisationComponent;
  let fixture: ComponentFixture<UsermanagementInOrganisationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsermanagementInOrganisationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsermanagementInOrganisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
