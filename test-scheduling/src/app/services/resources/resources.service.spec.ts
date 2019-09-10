import { TestBed } from '@angular/core/testing';
import {Resources} from "../../interfaces/resources";
import { HttpClientModule } from '@angular/common/http';
import {ResourcesService} from "./resources.service";

describe('ResourcesService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule,
    ],
  }));

  it('should be created', () => {
    const service: ResourcesService = TestBed.get(ResourcesService);
    expect(service).toBeTruthy();
  });
});
