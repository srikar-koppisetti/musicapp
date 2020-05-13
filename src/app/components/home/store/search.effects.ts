import { Actions, ofType, Effect } from '@ngrx/effects';
import * as SearchAction from './search.actions';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api/api.service';

@Injectable()
export class SearchEffect {

    @Effect()
    searchResult = this.actions$.pipe(
        ofType(SearchAction.SEARCH_ITEM),
        switchMap((searchItem: SearchAction.SearchItem) => {
            return this.restService.getSearchResults(searchItem.payload.searchItem).pipe(
                map(resData => {
                    return new SearchAction.SearchSuccess({
                        searchResult: resData
                    });
                }),
                catchError(resError => {
                    return of(new SearchAction.SearchError('No data found'));
                })
            );
        })
    );



    constructor(private actions$: Actions,
                private restService: ApiService) { }
}
