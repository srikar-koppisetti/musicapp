import { Actions, ofType, Effect } from '@ngrx/effects';
import * as SearchAction from './search.actions';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class SearchEffect {

    @Effect()
    searchResult = this.actions$.pipe(
        ofType(SearchAction.SEARCH_ITEM),
        switchMap((searchItem: SearchAction.SearchItem) => {
            return this.http.get<any>(`${environment.appleApiUrl}/search?term=${searchItem.payload.searchItem}`).pipe(
                map(resData => {
                    return new SearchAction.SearchSuccess({
                        searchResult: resData
                    });
                }),
                catchError(resError => {
                    if (!resError) {
                        return of(new SearchAction.SearchError('No data found'));
                    }
                })
            );
        })
    );



    constructor(private actions$: Actions, private http: HttpClient) {}
}
