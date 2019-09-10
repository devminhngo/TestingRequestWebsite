import {inject, TestBed} from '@angular/core/testing';
import {SearchService} from "./search.service";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {SearchResults} from "../../interfaces/search-results";

describe('SearchService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
    ],
  }));

  it('should be created', () => {
    const service: SearchService = TestBed.get(SearchService);
    expect(service).toBeTruthy();
  });

  it('expects to get search results', inject([HttpTestingController, SearchService],
    (httpMock: HttpTestingController, service: SearchService) => {

    let searchString: string = "test";
    let testResults: SearchResults;

      service.getSearchResults(searchString).subscribe(result => {
        expect(result).toBeTruthy();
      });

      const req = httpMock.expectOne('http://localhost:3030/search?search=test');
      expect(req.request.method).toEqual('GET');

      httpMock.verify();
    })
  );

});
