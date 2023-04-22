import { TestBed } from '@angular/core/testing';

import { UiEmailService } from './ui-email.service';

describe('UiEmailService', () => {
  let service: UiEmailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UiEmailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
