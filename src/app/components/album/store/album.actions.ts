import { Action } from '@ngrx/store';

export const ALBUM_ITEM = '[Album] AlbumIteam';
export const ALBUM_SUCCESS = '[Album] AlbumSuccess';
export const ALBUM_ERROR = '[Album] AlbumError';

export class AlbumItem implements Action {
    readonly type = ALBUM_ITEM;
    constructor(public payload: {
        albumItem: string
    }) {}
}

export class AlbumSuccess implements Action {
    readonly type = ALBUM_SUCCESS;
    constructor(public payload: {
        albumResult: any
    }) {}
}

export class AlbumError implements Action {
    readonly type = ALBUM_ERROR;
    constructor(public payload: string) {}
}

export type AlbumActions = AlbumItem | AlbumSuccess | AlbumError;
