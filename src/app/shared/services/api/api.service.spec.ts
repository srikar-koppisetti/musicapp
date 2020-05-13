import { TestBed, getTestBed, tick } from '@angular/core/testing';

import { ApiService } from './api.service';
import { HttpClientModule, HttpRequest } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('ApiService', () => {
  let injector: TestBed;
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        ApiService
      ]
    });
    injector = getTestBed();
    service = TestBed.get(ApiService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should test getSearchResults()', () => {
    const searchItem = 'slash';
    const results = [];
    service.getSearchResults(searchItem).subscribe(_ => expect(results).toBe(_));
    const req = httpMock.expectOne((request: HttpRequest<any>): boolean => {
      expect(request.url).toEqual(`https://itunes.apple.com/search?term=${searchItem}`);
      expect(request.method).toBe('GET');
      return true;
    });
    req.flush(results);
  });

  it('should test getSearchResults() has data', () => {
    const searchItem = 'slash';
    service.cache = {
      searchItemResults: {
        slash: {}
      },
      artistResults: {},
      albumResults: {}
    };
    service.getSearchResults(searchItem);
  });

  it('should test getArtistResult()', () => {
    const artistId = '330880234';
    const results = [];
    service.getArtistResult(artistId).subscribe(_ => expect(results).toBe(_));
    const req = httpMock.expectOne((request: HttpRequest<any>): boolean => {
      expect(request.url).toEqual(`https://itunes.apple.com/lookup?id=${artistId}&entity=album`);
      expect(request.method).toBe('GET');
      return true;
    });
    req.flush(results);
  });

  it('should test getArtistResult() has data', () => {
    const searchItem = '330880234';
    service.cache = {
      searchItemResults: {},
      artistResults: {
        330880234: {}
      },
      albumResults: {}
    };
    service.getArtistResult(searchItem);
  });

  it('should test getAlbumResults()', () => {
    const collectionId = '884199046';
    const results = [];
    service.getAlbumResults(collectionId).subscribe(_ => expect(results).toBe(_));
    const req = httpMock.expectOne((request: HttpRequest<any>): boolean => {
      expect(request.url).toEqual(`https://itunes.apple.com/lookup?id=${collectionId}&entity=song`);
      expect(request.method).toBe('GET');
      return true;
    });
    req.flush(results);
  });

  it('should test getAlbumResults() has data', () => {
    const searchItem = '330880234';
    service.cache = {
      searchItemResults: {},
      artistResults: {},
      albumResults: {
        330880234: {}
      }
    };
    service.getAlbumResults(searchItem);
  });
});
