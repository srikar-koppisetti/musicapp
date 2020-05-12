import * as AlbumActions from './album.actions';

export interface State {
    albumItem: string;
    albumResults: any;
    albumError: string;
}

const initialState = {
    albumItem: null,
    albumResults: null,
    albumError: null
};

export function albumReducer(state = initialState, action: AlbumActions.AlbumActions) {
    switch (action.type) {
        case AlbumActions.ALBUM_ITEM:
            const albumItem = action.payload.albumItem;
            return {
                ...state,
                albumItem,
                albumError: null
            };

        case AlbumActions.ALBUM_SUCCESS:
            return {
                ...state,
                albumResults: action.payload.albumResult,
                albumError: null
            };

        case AlbumActions.ALBUM_ERROR:
            return {
                ...state,
                albumResults: null,
                albumError: action.payload
            };

        default:
            return state;
    }
}
