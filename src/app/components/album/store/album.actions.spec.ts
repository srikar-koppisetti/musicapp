import * as AlbumActions from './album.actions';

describe('AlbumItem', () => {
    it('should create an action', () => {
        const action = new AlbumActions.AlbumItem({
            albumItem: 'slash'
        });
        expect(action.type).toEqual(AlbumActions.ALBUM_ITEM);
    });
});

describe('AlbumError', () => {
    it('should create an action', () => {
        const action = new AlbumActions.AlbumError('abc');
        expect(action.type).toEqual(AlbumActions.ALBUM_ERROR);
    });
});

describe('AlbumSuccess', () => {
    it('should create an action', () => {
        const action = new AlbumActions.AlbumSuccess({
            albumResult: {
                resultCount: 2,
                results: []
            }
        });
        expect(action.type).toEqual(AlbumActions.ALBUM_SUCCESS);
     });
});
