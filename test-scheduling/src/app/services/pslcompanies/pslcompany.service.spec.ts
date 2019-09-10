import { TestBed } from '@angular/core/testing';
import {PSLCompaniesService} from "./pslcompany.service";
import { HttpClientModule } from '@angular/common/http';

describe('PSLCompaniesService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule,
    ],
  }));

  it('should be created', () => {
    const service: PSLCompaniesService = TestBed.get(PSLCompaniesService);
    expect(service).toBeTruthy();
  });
});
