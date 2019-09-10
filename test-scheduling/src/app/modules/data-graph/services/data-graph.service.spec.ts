import { TestBed } from '@angular/core/testing';

import { DataGraphService } from './data-graph.service';

describe('DataGraphService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataGraphService = TestBed.get(DataGraphService);
    expect(service).toBeTruthy();
  });
});
