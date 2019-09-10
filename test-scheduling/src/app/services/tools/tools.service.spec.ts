import { TestBed } from '@angular/core/testing';
import {ToolsService} from "./tools.service";
import { HttpClientModule } from '@angular/common/http';

describe('ToolsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule,
    ],
  }));

  it('should be created', () => {
    const service: ToolsService = TestBed.get(ToolsService);
    expect(service).toBeTruthy();
  });
});
