import { TestBed } from '@angular/core/testing';

import { TaskDraftService } from './task-draft.service';

describe('TaskDraftService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TaskDraftService = TestBed.get(TaskDraftService);
    expect(service).toBeTruthy();
  });
});
