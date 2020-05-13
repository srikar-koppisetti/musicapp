import { Actions, ofType, Effect } from '@ngrx/effects';
import * as AlbumActions from './album.actions';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api/api.service';

@Injectable()
export class AlbumEffect {

    @Effect()
    albumResult = this.actions$.pipe(
        ofType(AlbumActions.ALBUM_ITEM),
        switchMap((albumItem: AlbumActions.AlbumItem) => {
            return this.restService.getAlbumResults(albumItem.payload.albumItem).pipe(
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
    constructor(private actions$: Actions,
                private router: Router,
                private restService: ApiService) { }
}
