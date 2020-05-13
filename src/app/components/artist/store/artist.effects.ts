import { Actions, ofType, Effect } from '@ngrx/effects';
import * as ArtistAction from './artist.action';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class ArtistEffect {
    @Effect()
    searchResult = this.actions$.pipe(
        ofType(ArtistAction.ARTIST_ITEM),
        switchMap((artistItem: ArtistAction.ArtistIteam) => {
            return this.http.get<any>(`${environment.appleApiUrl}/lookup?id=${artistItem.payload.artistItem}&entity=album`).pipe(
                map(resData => {
                    return new ArtistAction.ArtistSuccess({
                        artistResult: resData
                    });
                }),
                catchError(resError => {
                    this.router.navigate(['/page-not-found']);
                    return of(new ArtistAction.ArtistError('No data found'));
                })
            );
        })
    );

    constructor(private actions$: Actions, private http: HttpClient, public router: Router) { }
}
