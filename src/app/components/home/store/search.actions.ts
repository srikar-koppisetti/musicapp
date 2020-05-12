import { Action } from '@ngrx/store';

export const SEARCH_ITEM = '[Search] SearchIteam';
export const SEARCH_SUCCESS = '[Search] SearchSuccess';
export const SEARCH_ERROR = '[Search] SearchError';

export class SearchItem implements Action {
    readonly type = SEARCH_ITEM;
    constructor(public payload: {
        searchItem: string
    }) {}
}

export class SearchSuccess implements Action {
    readonly type = SEARCH_SUCCESS;
    constructor(public payload: {
        searchResult: any
    }) {}
}

export class SearchError implements Action {
    readonly type = SEARCH_ERROR;
    constructor(public payload: string) {}
}

export type SearchActions = SearchItem  | SearchSuccess | SearchError;
