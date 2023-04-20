import { TestBed } from '@angular/core/testing';

import { UiUserService } from './ui-user.service';

describe('UiUserService', () => {
  let service: UiUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UiUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
