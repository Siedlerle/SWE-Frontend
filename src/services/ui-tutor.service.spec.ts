import { TestBed } from '@angular/core/testing';

import { UiTutorService } from './ui-tutor.service';

describe('UiTutorService', () => {
  let service: UiTutorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UiTutorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
