import { TestBed } from '@angular/core/testing';

import { WorkRequestDraftService } from './work-request-draft.service';

describe('WorkRequestDraftService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WorkRequestDraftService = TestBed.get(WorkRequestDraftService);
    expect(service).toBeTruthy();
  });
});
