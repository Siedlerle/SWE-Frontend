import { TestBed } from '@angular/core/testing';

import { UiOrganizerService } from './ui-organizer.service';

describe('UiOrganizerService', () => {
  let service: UiOrganizerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UiOrganizerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
