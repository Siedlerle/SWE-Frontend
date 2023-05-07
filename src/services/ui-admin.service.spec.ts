import { TestBed } from '@angular/core/testing';

import { UiAdminService } from './ui-admin.service';

describe('UiAdminService', () => {
  let service: UiAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UiAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
