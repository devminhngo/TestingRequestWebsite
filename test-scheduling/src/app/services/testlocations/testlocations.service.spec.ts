import { TestBed } from '@angular/core/testing';

import { TestlocationsService } from './testlocations.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TestlocationsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
    ]
  }));

  it('should be created', () => {
    const service: TestlocationsService = TestBed.get(TestlocationsService);
    expect(service).toBeTruthy();
  });
});
