import { TestBed } from '@angular/core/testing';

import { GroupsService } from './groups.service';
import { HttpClientModule } from '@angular/common/http';

describe('GroupsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule,
    ],
  }));

  it('should be created', () => {
    const service: GroupsService = TestBed.get(GroupsService);
    expect(service).toBeTruthy();
  });
});
