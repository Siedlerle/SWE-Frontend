import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganisationBannerUploadComponent } from './organisation-banner-upload.component';

describe('OrganisationBannerUploadComponent', () => {
  let component: OrganisationBannerUploadComponent;
  let fixture: ComponentFixture<OrganisationBannerUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganisationBannerUploadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrganisationBannerUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
