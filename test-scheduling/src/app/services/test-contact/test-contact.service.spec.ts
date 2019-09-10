import { TestBed } from '@angular/core/testing';
import {TestContactsService} from "./test-contact.service";
import { HttpClientModule } from '@angular/common/http';

describe('ToolsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule,
    ],
  }));

  it('should be created', () => {
    const service: TestContactsService = TestBed.get(TestContactsService);
    expect(service).toBeTruthy();
  });
});
