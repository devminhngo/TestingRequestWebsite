import { TestBed } from '@angular/core/testing';
import {RequestorService} from "./requestor.service";
import { HttpClientModule } from '@angular/common/http';

describe('RequestorService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule,
    ],
  }));

  it('should be created', () => {
    const service: RequestorService = TestBed.get(RequestorService);
    expect(service).toBeTruthy();
  });
});
