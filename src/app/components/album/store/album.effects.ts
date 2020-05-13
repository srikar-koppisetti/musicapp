import { Actions, ofType, Effect } from '@ngrx/effects';
import * as AlbumActions from './album.actions';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class AlbumEffect {

    @Effect()
    albumResult = this.actions$.pipe(
        ofType(AlbumActions.ALBUM_ITEM),
        switchMap((albumItem: AlbumActions.AlbumItem) => {
            return this.http.get<any>(`${environment.appleApiUrl}/lookup?id=${albumItem.payload.albumItem}&entity=song`).pipe(
                map(resData => {
                    return new AlbumActions.AlbumSuccess({
                        albumResult: resData
                    });
                }),
                catchError(resError => {
                    this.router.navigate(['/page-not-found']);
                    return of(new AlbumActions.AlbumError('No data found'));
                })
            );
        })
    );
    constructor(private actions$: Actions, private http: HttpClient, private router: Router) { }
}
