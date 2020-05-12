import * as SearchActions from './search.actions';

export interface State {
    searchItem: string;
    searchResults: any;
    searchError: string;
}

const initialState = {
    searchItem: null,
    searchResults: null,
    searchError: null
};

export function searchReducer(state = initialState, action: SearchActions.SearchActions) {
    switch (action.type) {
        case SearchActions.SEARCH_ITEM:
            const searchItem = action.payload.searchItem;
            return {
                ...state,
                searchItem,
                searchError: null
            };

        case SearchActions.SEARCH_SUCCESS:
            return {
                ...state,
                searchResults: action.payload.searchResult,
                searchError: null
            };

        case SearchActions.SEARCH_ERROR:
            return {
                ...state,
                searchResults: null,
                searchError: action.payload
            };

        default:
            return state;
    }
}
