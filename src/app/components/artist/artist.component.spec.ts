import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { ArtistComponent } from './artist.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ApiService } from 'src/app/shared/services/api/api.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage/local-storage.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { IArtist } from 'src/app/shared/models/artist.model';
import { WrapperType, LocalStorageItems } from 'src/app/shared/models/enum.model';
import { IFavourite } from 'src/app/shared/models/favourite.model';
import { throwError, of } from 'rxjs';
import { StoreModule } from '@ngrx/store';
import { TestStore } from 'src/app/shared/services/utils/test-store';
import { Store } from '@ngrx/store';

describe('ArtistComponent', () => {
  let component: ArtistComponent;
  let fixture: ComponentFixture<ArtistComponent>;
  let store: TestStore<any>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, HttpClientTestingModule, StoreModule],
      declarations: [ArtistComponent],
      providers: [
        ApiService,
        LocalStorageService,
        { provide: Store, useClass: TestStore }
      ]
    })
      .compileComponents();
  }));

  beforeEach(inject([Store], (testStore: TestStore<any>) => {
    store = testStore;
    store.setState({ items: [], filter: 'ALL' });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should test goToAlbum()', () => {
    const id = 1234;
    spyOn(component.router, 'navigate');
    component.goToAlbum(id);
    expect(component.router.navigate).toHaveBeenCalled();
  });

  it('should test checkIsFavourite()', () => {
    const artist: IArtist = {
      wrapperType: WrapperType.artist,
      artistId: '1234',
      artistName: 'Slash',
      artworkUrl100: ''
    };
    const favArtist = {
      wrapperType: WrapperType.artist,
      favId: '1234',
      favTitle: 'Slash',
      favImage: '',
      isFavourite: false
    };
    localStorage.setItem(LocalStorageItems.favorites, '[]');
    component.artist = artist;
    component.checkIsFavourite();
    expect(component.favouriteArtist.isFavourite).toBeFalse();
  });

  it('should test checkIsFavourite() no artist', () => {
    localStorage.setItem(LocalStorageItems.favorites, '[]');
    component.artist = undefined;
    component.checkIsFavourite();
    expect();
  });

  it('should test pushFavArtist() isFavourite false', () => {
    const favArtist: IFavourite = {
      wrapperType: WrapperType.artist,
      favId: '1234',
      favTitle: 'Slash',
      favImage: '',
      isFavourite: false
    };
    component.favouriteArtist = favArtist;
    component.pushFavArtist();
    expect(component.favouriteArtist.isFavourite).toBeTruthy();
  });

  it('should test pushFavArtist() isFavourite true', () => {
    const favArtist: IFavourite = {
      wrapperType: WrapperType.artist,
      favId: '1234',
      favTitle: 'Slash',
      favImage: '',
      isFavourite: true
    };
    component.favouriteArtist = favArtist;
    component.pushFavArtist();
    expect(component.favouriteArtist.isFavourite).toBeFalsy();
  });

  it('should test getArtist() with id and resultCount < 2', () => {
    const id = '1234';
    const response = {
      resultCount: 1,
      results: [{
        artistId: id
      }]
    };
    store.setState({
      artistItem: id,
      artistResults: response,
      artistError: 'No data found'
    });
    spyOn(component.router, 'navigate');
    component.getArtist(id);
    expect(component.router.navigate).toHaveBeenCalled();
  });

  it('should test getArtist() with id and resultCount > 2', () => {
    const id = '1234';
    const response = {
      resultCount: 3,
      results: [
        {
          wrapperType: 'artist',
          artistType: 'Artist',
          artistName: 'Phineas',
          artistLinkUrl: 'https://music.apple.com/us/artist/phineas/330880234?uo=4',
          artistId: id,
          primaryGenreName: 'Hip-Hop/Rap',
          primaryGenreId: 18
        },
        {
          wrapperType: 'collection',
          collectionType: 'Album',
          artistId: 330880234,
          collectionId: 1499769331,
          artistName: 'Phineas & Alwrong',
          collectionName: 'Alone in This Together - EP',
          collectionCensoredName: 'Alone in This Together - EP',
          artworkUrl100: 'https://is4-ssl.mzstatic.com/image/thumb/Music124/v4/d2/5e/2e/d25e2ef6-065b-7855-3e35-ce29d9fdb0ea/source/100x100bb.jpg'
        },
        ,
        {
          wrapperType: 'collection',
          collectionType: 'Album',
          artistId: 330880234,
          collectionId: 1499769331,
          artistName: 'Phineas & Alwrong',
          collectionName: 'Alone in This Together - EP',
          collectionCensoredName: 'Alone in This Together - EP',
          artworkUrl100: 'https://is4-ssl.mzstatic.com/image/thumb/Music124/v4/d2/5e/2e/d25e2ef6-065b-7855-3e35-ce29d9fdb0ea/source/100x100bb.jpg'
        }
      ]
    };
    store.setState({
      artistItem: id,
      artistResults: response,
      artistError: 'No data found'
    });
    spyOn(component.router, 'navigate');
    spyOn(component, 'checkIsFavourite');
    component.getArtist(id);
    expect(component.checkIsFavourite).toHaveBeenCalled();
  });

  xit('should test getArtist() with id and resultCount > 2 but wrapperType not artist', () => {
    const id = '1234';
    const response = {
      resultCount: 3,
      results: [
        {
          wrapperType: 'title',
          artistType: 'Artist',
          artistName: 'Phineas',
          artistLinkUrl: 'https://music.apple.com/us/artist/phineas/330880234?uo=4',
          artistId: 330880234,
          primaryGenreName: 'Hip-Hop/Rap',
          primaryGenreId: 18
        },
        {
          wrapperType: 'collection',
          collectionType: 'Album',
          artistId: 330880234,
          collectionId: 1499769331,
          artistName: 'Phineas & Alwrong',
          collectionName: 'Alone in This Together - EP',
          collectionCensoredName: 'Alone in This Together - EP',
          artworkUrl100: 'https://is4-ssl.mzstatic.com/image/thumb/Music124/v4/d2/5e/2e/d25e2ef6-065b-7855-3e35-ce29d9fdb0ea/source/100x100bb.jpg'
        },
        ,
        {
          wrapperType: 'collection',
          collectionType: 'Album',
          artistId: 330880234,
          collectionId: 1499769331,
          artistName: 'Phineas & Alwrong',
          collectionName: 'Alone in This Together - EP',
          collectionCensoredName: 'Alone in This Together - EP',
          artworkUrl100: 'https://is4-ssl.mzstatic.com/image/thumb/Music124/v4/d2/5e/2e/d25e2ef6-065b-7855-3e35-ce29d9fdb0ea/source/100x100bb.jpg'
        }
      ]
    };
    const apiService = TestBed.get(ApiService);
    spyOn(component.router, 'navigate');
    spyOn(component, 'checkIsFavourite');
    spyOn(apiService, 'getArtistResult').and.returnValue(of(response));
    component.getArtist(id);
    expect();
    });
});
