import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresetManagementComponent } from './preset-management.component';

describe('PresetManagementComponent', () => {
  let component: PresetManagementComponent;
  let fixture: ComponentFixture<PresetManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PresetManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PresetManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
