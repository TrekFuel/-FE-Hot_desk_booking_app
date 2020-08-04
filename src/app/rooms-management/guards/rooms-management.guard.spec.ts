import { TestBed } from '@angular/core/testing';

import { RoomsManagementGuard } from './rooms-management.guard';

describe('RoomsManagementGuard', () => {
  let guard: RoomsManagementGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RoomsManagementGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
