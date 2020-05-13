import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    public http: HttpClient
  ) { }

  // HTTP request to get search item results
  getSearchResults(searchItem: string): Observable<any> {
    return this.http.get<any>(`${environment.appleApiUrl}/search?term=${searchItem}`);
  }

  // HTTP request to get artist results of artist id
  getArtistResult(artistId: string): Observable<any> {
    return this.http.get<any>(`${environment.appleApiUrl}/lookup?id=${artistId}&entity=album`);
  }

  // HTTP request to get album results of album id
  getAlbumResults(collectionId: string): Observable<any> {
    return this.http.get<any>(`${environment.appleApiUrl}/lookup?id=${collectionId}&entity=song`);
  }
}
