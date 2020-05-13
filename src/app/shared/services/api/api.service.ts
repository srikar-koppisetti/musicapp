import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { shareReplay, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public cache = {
    searchItemResults: {},
    artistResults: {},
    albumResults: {}
  };

  constructor(
    public http: HttpClient,
    public router: Router
  ) { }

  // HTTP request to get search item results and cache the response to reduce duplicate http requests
  getSearchResults(searchItem: string): Observable<any> {
    if (this.cache.searchItemResults[searchItem]) {
      return this.cache.searchItemResults[searchItem];
    }
    this.cache.searchItemResults[searchItem] = this.http.get(`${environment.appleApiUrl}/search?term=${searchItem}`).pipe(
      shareReplay(1),
      catchError(err => {
        this.router.navigate(['/page-not-found']);
        delete this.cache.searchItemResults[searchItem];
        return EMPTY;
      })
    );
    return this.cache.searchItemResults[searchItem];
  }

  // HTTP request to get artist results of artist id and cache the response to reduce duplicate http requests
  getArtistResult(artistId: string): Observable<any> {
    if (this.cache.artistResults[artistId]) {
      return this.cache.artistResults[artistId];
    }
    this.cache.artistResults[artistId] = this.http.get<any>(`${environment.appleApiUrl}/lookup?id=${artistId}&entity=album`).pipe(
      shareReplay(1),
      catchError(err => {
        this.router.navigate(['/page-not-found']);
        delete this.cache.artistResults[artistId];
        return EMPTY;
      })
    );
    return this.cache.artistResults[artistId];
  }

  // HTTP request to get album results of album id and cache the response to reduce duplicate http requests
  getAlbumResults(collectionId: string): Observable<any> {
    if (this.cache.albumResults[collectionId]) {
      return this.cache.albumResults[collectionId];
    }
    this.cache.albumResults[collectionId] = this.http.get<any>(`${environment.appleApiUrl}/lookup?id=${collectionId}&entity=song`).pipe(
      shareReplay(1),
      catchError(err => {
        this.router.navigate(['/page-not-found']);
        delete this.cache.albumResults[collectionId];
        return EMPTY;
      })
    );
    return this.cache.albumResults[collectionId];
  }
}
