import { Actions, ofType, Effect } from '@ngrx/effects';
import * as ArtistAction from './artist.action';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api/api.service';

@Injectable()
export class ArtistEffect {
    @Effect()
    searchResult = this.actions$.pipe(
        ofType(ArtistAction.ARTIST_ITEM),
        switchMap((artistItem: ArtistAction.ArtistIteam) => {
            return this.restService.getArtistResult(artistItem.payload.artistItem).pipe(
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

    constructor(private actions$: Actions,
                public router: Router,
                private restService: ApiService) { }
}
