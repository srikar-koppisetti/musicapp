import * as SearchActions from './search.actions';

describe('SearchIteam', () => {
    it('should create an action', () => {
        const action = new SearchActions.SearchItem({
            searchItem: 'slash'
        });
        expect(action.type).toEqual(SearchActions.SEARCH_ITEM);
    });
});

describe('SearchError', () => {
    it('should create an action', () => {
        const action = new SearchActions.SearchError('abc');
        expect(action.type).toEqual(SearchActions.SEARCH_ERROR);
    });
});

describe('SearchSuccess', () => {
    it('should create an action', () => {
        const action = new SearchActions.SearchSuccess({
            searchResult: {
                resultCount: 2,
                results: []
            }
        });
        expect(action.type).toEqual(SearchActions.SEARCH_SUCCESS);
     });
});
