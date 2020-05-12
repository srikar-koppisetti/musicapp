import { Action } from '@ngrx/store';

export const ARTIST_ITEM = '[Artist] ArtistIteam';
export const ARTIST_SUCCESS = '[Artist] ArtistSuccess';
export const ARTIST_ERROR = '[Artist] ArtistError';

export class ArtistIteam implements Action{
    readonly type = ARTIST_ITEM;
    constructor(public payload: {
        artistItem: string
    }) {}
}

export class ArtistSuccess implements Action {
    readonly type = ARTIST_SUCCESS;
    constructor(public payload: {
        artistResult: any
    }) {}
}

export class ArtistError implements Action {
    readonly type = ARTIST_ERROR;
    constructor(public payload: string) {}
}

export type ArtistActions = ArtistIteam | ArtistSuccess | ArtistError;
