import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageJoinRequestsComponent } from './manage-join-requests.component';

describe('ManageJoinRequestsComponent', () => {
  let component: ManageJoinRequestsComponent;
  let fixture: ComponentFixture<ManageJoinRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageJoinRequestsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageJoinRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
