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

  getSearchResults(searchItem: string): Observable<any> {
    return this.http.get<any>(`${environment.appleApiUrl}/search?term=${searchItem}`);
  }

  getArtistResult(artistId: number): Observable<any> {
    return this.http.get<any>(`${environment.appleApiUrl}/lookup?id=${artistId}&entity=album`);
  }

  getAlbumResults(collectionId: number): Observable<any> {
    return this.http.get<any>(`${environment.appleApiUrl}/lookup?id=${collectionId}&entity=song`);
  }
}
