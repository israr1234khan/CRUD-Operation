import { TestBed } from '@angular/core/testing';

import { EmplistService } from './emplist.service';

describe('EmplistService', () => {
  let service: EmplistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmplistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
