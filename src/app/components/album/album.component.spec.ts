import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { AlbumComponent } from './album.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api/api.service';
import { of, throwError } from 'rxjs';
import { IFavourite } from 'src/app/shared/models/favourite.model';
import { WrapperType } from 'src/app/shared/models/enum.model';
import { IAlbum } from 'src/app/shared/models/album.model';
import { StoreModule } from '@ngrx/store';
import { TestStore } from 'src/app/shared/services/utils/test-store';
import { Store } from '@ngrx/store';


describe('AlbumComponent', () => {
  let component: AlbumComponent;
  let fixture: ComponentFixture<AlbumComponent>;
  let store: TestStore<any>;
  const mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, HttpClientTestingModule],
      declarations: [AlbumComponent],
      providers: [
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
    fixture = TestBed.createComponent(AlbumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should test goToArtist()', () => {
    const id = 1234;
    spyOn(component.router, 'navigate');
    component.goToArtist(id);
    expect(component.router.navigate).toHaveBeenCalled();
  });

  it('should test pushFavTrack() isFavourite = true', () => {
    const favTracks: IFavourite[] = [{
      wrapperType: WrapperType.track,
      favId: '123',
      favTitle: 'Slash',
      favImage: '',
      isFavourite: true
    },
    {
      wrapperType: WrapperType.track,
      favId: '1234',
      favTitle: 'Slash',
      favImage: '',
      isFavourite: true
    }];
    component.favouriteTracks = favTracks;
    component.pushFavTrack(0);
    expect(component.favouriteTracks[0].isFavourite).toBeFalsy();
  });

  it('should test pushFavTrack() isFavourite = false', () => {
    const favTracks: IFavourite[] = [{
      wrapperType: WrapperType.track,
      favId: '123',
      favTitle: 'Slash',
      favImage: '',
      isFavourite: false
    },
    {
      wrapperType: WrapperType.track,
      favId: '1234',
      favTitle: 'Slash',
      favImage: '',
      isFavourite: true
    }];
    component.favouriteTracks = favTracks;
    component.pushFavTrack(0);
    spyOn(component.localStorageSvc, 'updateFavourites');
    expect(component.favouriteTracks[0].isFavourite).toBeTruthy();
  });

  it('should test pushFavAlbum() isFavourite = true', () => {
    const favAlbum: IFavourite = {
      wrapperType: WrapperType.collection,
      favId: '123',
      favTitle: 'Slash',
      favImage: '',
      isFavourite: true
    };
    component.favouriteAlbum = favAlbum;
    component.pushFavAlbum();
    spyOn(component.localStorageSvc, 'updateFavourites');
    expect(component.favouriteAlbum.isFavourite).toBeFalsy();
  });

  it('should test pushFavAlbum() isFavourite = false', () => {
    const favAlbum: IFavourite = {
      wrapperType: WrapperType.collection,
      favId: '123',
      favTitle: 'Slash',
      favImage: '',
      isFavourite: false
    };
    component.favouriteAlbum = favAlbum;
    component.pushFavAlbum();
    spyOn(component.localStorageSvc, 'updateFavourites');
    expect(component.favouriteAlbum.isFavourite).toBeTruthy();
  });

  it('should test checkFavouriteTracks()', () => {
    const tracks = [
      {
        wrapperType: WrapperType.track,
        trackName: 'GNR',
        trackId: '1234',
        artworkUrl100: ''
      },
      {
        wrapperType: WrapperType.track,
        trackName: 'GNR1',
        trackId: '12345',
        artworkUrl100: ''
      }
    ];
    spyOn(component.favouriteTracks, 'push');
    component.tracks = tracks;
    component.checkFavouriteTracks();
    expect(component.favouriteTracks.push).toHaveBeenCalled();
  });

  it('should test checkIsFavourite()', () => {
    const album: IAlbum = {
      wrapperType: WrapperType.collection,
      collectionId: '123',
      collectionName: 'Slash',
      artworkUrl100: ''
    };
    spyOn(component.localStorageSvc, 'isFavourite');
    component.album = album;
    component.checkIsFavourite();
    expect(component.favouriteAlbum.isFavourite).toBeFalsy();
  });

  it('should test checkIsFavourite() album undefined', () => {
    spyOn(component.localStorageSvc, 'isFavourite');
    component.album = undefined;
    component.checkIsFavourite();
    expect();
  });

  it('should test getAlbums() with id and resultCount < 2', () => {
    const id = '1234';
    const response = {
      resultCount: 0,
      results: [
        {
          wrapperType: 'collection',
          artistType: 'Artist',
          artistName: 'Phineas',
          artistLinkUrl: 'https://music.apple.com/us/artist/phineas/330880234?uo=4',
          artistId: 330880234,
          primaryGenreName: 'Hip-Hop/Rap',
          primaryGenreId: 18,
          collectionId: id
        }
      ]
    };
    store.setState({
      albumItem: id,
      albumResults: response,
      albumError: 'No data found'
    });
    spyOn(component.router, 'navigate');
    component.getAlbums(id);
    expect(component.router.navigate).toHaveBeenCalled();
  });

  it('should test getAlbums() with id and resultCount > 2', () => {
    const id = '1234';
    const response = {
      resultCount: 3,
      results: [
        {
          wrapperType: 'collection',
          artistType: 'Artist',
          artistName: 'Phineas',
          artistLinkUrl: 'https://music.apple.com/us/artist/phineas/330880234?uo=4',
          artistId: 330880234,
          primaryGenreName: 'Hip-Hop/Rap',
          primaryGenreId: 18,
          collectionId: id
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
      albumItem: id,
      albumResults: response,
      albumError: 'No data found'
    });
    spyOn(component.router, 'navigate');
    spyOn(component, 'checkIsFavourite');
    component.getAlbums(id);
    expect(component.checkIsFavourite).toHaveBeenCalled();
  });

});
