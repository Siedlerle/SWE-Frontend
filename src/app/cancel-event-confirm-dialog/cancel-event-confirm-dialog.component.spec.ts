import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelEventConfirmDialogComponent } from './cancel-event-confirm-dialog.component';

describe('CancelEventConfirmDialogComponent', () => {
  let component: CancelEventConfirmDialogComponent;
  let fixture: ComponentFixture<CancelEventConfirmDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CancelEventConfirmDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CancelEventConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
