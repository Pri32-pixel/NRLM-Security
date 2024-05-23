import { TestBed } from '@angular/core/testing';

import { SecuredataService } from './securedata.service';

describe('SecuredataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SecuredataService = TestBed.get(SecuredataService);
    expect(service).toBeTruthy();
  });
});
