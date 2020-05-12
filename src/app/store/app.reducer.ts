import * as fromSearchResults from '../components/home/store/search.reducer';
import * as fromAlbumResults from '../components/album/store/album.reducer';
import * as fromArtistResults from '../components/artist/store/artist.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
    search: fromSearchResults.State;
    album: fromAlbumResults.State;
    artist: fromArtistResults.State;
}

export const appReducer: ActionReducerMap<AppState> = {
    search: fromSearchResults.searchReducer,
    album: fromAlbumResults.albumReducer,
    artist: fromArtistResults.artistReducer
};
