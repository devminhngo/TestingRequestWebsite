import { TestBed } from '@angular/core/testing';

import { PrioritiesService } from './priorities.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PrioritiesService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
    ]
  }));

  it('should be created', () => {
    const service: PrioritiesService = TestBed.get(PrioritiesService);
    expect(service).toBeTruthy();
  });
});
