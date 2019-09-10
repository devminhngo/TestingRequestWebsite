import { TestBed } from '@angular/core/testing';
import {RequestDriverService} from "./request-driver.service";
import { HttpClientModule } from '@angular/common/http';

describe('RequestDriverService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule,
    ],
  }));

  it('should be created', () => {
    const service: RequestDriverService = TestBed.get(RequestDriverService);
    expect(service).toBeTruthy();
  });
});
