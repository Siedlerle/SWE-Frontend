import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganisationCatalogComponent } from './organisation-catalog.component';

describe('OrganisationCatalogComponent', () => {
  let component: OrganisationCatalogComponent;
  let fixture: ComponentFixture<OrganisationCatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganisationCatalogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrganisationCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
