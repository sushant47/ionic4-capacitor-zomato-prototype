import { TestBed } from '@angular/core/testing';

import { ZomatoApiService } from './zomato-api.service';

describe('ZomatoApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ZomatoApiService = TestBed.get(ZomatoApiService);
    expect(service).toBeTruthy();
  });
});
