import { TestBed } from '@angular/core/testing';

import { ApiService } from './api.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        ApiService
      ]
    });
    service = TestBed.get(ApiService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should test getSearchResults()', () => {
    const searchItem = 'slash';
    const searhItemUrl = `${environment.appleApiUrl}/search?term=${searchItem}`;
    spyOn(service.http, 'get');
    service.getSearchResults(searchItem);
    expect(service.http.get).toHaveBeenCalledWith(searhItemUrl);
  });

  it('should test getArtistResult()', () => {
    const artistId = 12345;
    const artistIdUrl = `${environment.appleApiUrl}/lookup?id=${artistId}&entity=album`;
    spyOn(service.http, 'get');
    service.getArtistResult(artistId);
    expect(service.http.get).toHaveBeenCalledWith(artistIdUrl);
  });

  it('should test getAlbumResults()', () => {
    const collectionId = 12345;
    const collectionIdUrl = `${environment.appleApiUrl}/lookup?id=${collectionId}&entity=song`;
    spyOn(service.http, 'get');
    service.getAlbumResults(collectionId);
    expect(service.http.get).toHaveBeenCalledWith(collectionIdUrl);
  });
});