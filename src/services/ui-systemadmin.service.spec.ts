import { TestBed } from '@angular/core/testing';

import { UiSystemadminService } from './ui-systemadmin.service';

describe('UiSystemadminService', () => {
  let service: UiSystemadminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UiSystemadminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
