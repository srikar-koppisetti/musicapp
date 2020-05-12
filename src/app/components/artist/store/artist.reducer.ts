import * as ArtistActions from './artist.action';

export interface State {
    artistItem: string;
    artistResults: any;
    artistError: string;
}

const initialState = {
    artistItem: null,
    artistResults: null,
    artistError: null
};

export function artistReducer(state = initialState, action: ArtistActions.ArtistActions) {
    switch (action.type) {
        case ArtistActions.ARTIST_ITEM:
            const artistItem = action.payload.artistItem;
            return {
                ...state,
                artistItem,
                artistError: null
            };

        case ArtistActions.ARTIST_SUCCESS:
            return {
                ...state,
                artistResults: action.payload.artistResult,
                artistError: null
            };

        case ArtistActions.ARTIST_ERROR:
            return {
                ...state,
                artistResults: null,
                artistError: action.payload
            };

        default:
            return state;
    }
}
