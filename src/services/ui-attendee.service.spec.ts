import { TestBed } from '@angular/core/testing';

import { UiAttendeeService } from './ui-attendee.service';

describe('UiAttendeeService', () => {
  let service: UiAttendeeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UiAttendeeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
