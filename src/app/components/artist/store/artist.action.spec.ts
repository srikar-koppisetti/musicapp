import * as ArtistActions from './artist.action';

describe('ArtistIteam', () => {
    it('should create an action', () => {
        const action = new ArtistActions.ArtistIteam({
            artistItem: 'slash'
        });
        expect(action.type).toEqual(ArtistActions.ARTIST_ITEM);
    });
});

describe('ArtistError', () => {
    it('should create an action', () => {
        const action = new ArtistActions.ArtistError('abc');
        expect(action.type).toEqual(ArtistActions.ARTIST_ERROR);
    });
});

describe('ArtistSuccess', () => {
    it('should create an action', () => {
        const action = new ArtistActions.ArtistSuccess({
            artistResult: {
                resultCount: 2,
                results: []
            }
        });
        expect(action.type).toEqual(ArtistActions.ARTIST_SUCCESS);
     });
});
