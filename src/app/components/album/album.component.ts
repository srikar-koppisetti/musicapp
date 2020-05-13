import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { QueryParams, WrapperType } from 'src/app/shared/models/enum.model';
import { ApiService } from 'src/app/shared/services/api/api.service';
import { IAlbum } from 'src/app/shared/models/album.model';
import { IFavourite } from 'src/app/shared/models/favourite.model';
import { LocalStorageService } from 'src/app/shared/services/local-storage/local-storage.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as AlbumActions from './store/album.actions';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit, OnDestroy {

  public collectionId: string;
  private sub: Subscription;
  private albumSub: Subscription;
  public displayAlbum: boolean;
  public album: IAlbum;
  public tracks: any[];
  public favouriteAlbum: IFavourite;
  public favouriteTracks: IFavourite[] = [];

  constructor(private route: ActivatedRoute,
              private apiService: ApiService,
              public router: Router,
              public localStorageSvc: LocalStorageService,
              private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.displayAlbum = false;
    this.sub = this.route.queryParamMap
      .subscribe(
        (data) => {
          this.collectionId = data.get(QueryParams.collectionId);
        }
      );

    this.getAlbums(this.collectionId);
  }

  // gets album information and tracks under the album from store
  getAlbums(collectionId: string) {
    this.store.dispatch(new AlbumActions.AlbumItem({ albumItem: collectionId }));
    this.albumSub = this.store.select('album').subscribe(
      (data) => {
        const albumResults = data.albumResults;
        if (!!data.albumResults && albumResults !== undefined && collectionId == albumResults.results[0].collectionId) {
          if (albumResults.resultCount < 2) {
            this.router.navigate(['/page-not-found']);
          }
          if (albumResults.results[0].wrapperType === WrapperType.collection
            && albumResults.resultCount >= 2
          ) {
            this.displayAlbum = true;
            const response = albumResults.results;
            this.album = {
              wrapperType: response[0].wrapperType,
              collectionId: response[0].collectionId,
              collectionName: response[0].collectionName,
              artworkUrl100: response[1].artworkUrl100
            };
            this.tracks = response.slice(1);
            this.checkIsFavourite();
            this.checkFavouriteTracks();
          }
        }
      }
    );
  }

  // check if the album is favourite
  checkIsFavourite(): void {
    if (!!this.album) {
      this.favouriteAlbum = {
        wrapperType: this.album.wrapperType,
        favTitle: this.album.collectionName,
        favId: this.album.collectionId,
        favImage: this.album.artworkUrl100,
        isFavourite: false
      };
      this.favouriteAlbum.isFavourite = this.localStorageSvc.isFavourite(this.favouriteAlbum.favId);
    }
  }

  // check for all the tracks which are favourite
  checkFavouriteTracks(): void {
    for (const track of this.tracks) {
      const favTrack = {
        wrapperType: track.wrapperType,
        favTitle: track.trackName,
        favId: track.trackId,
        favImage: track.artworkUrl100,
        isFavourite: false
      };
      favTrack.isFavourite = this.localStorageSvc.isFavourite(favTrack.favId);
      this.favouriteTracks.push(favTrack);
    }
  }

  // push favourite album to list of favourites in local storage
  pushFavAlbum(): void {
    if (this.favouriteAlbum.isFavourite) {
      this.favouriteAlbum.isFavourite = false;
    } else if (!this.favouriteAlbum.isFavourite) {
      this.favouriteAlbum.isFavourite = true;
    }
    this.localStorageSvc.updateFavourites(this.favouriteAlbum);
  }

  // push favourite tracks to list of favourites in local storage
  pushFavTrack(id: number): void {
    if (this.favouriteTracks[id].isFavourite) {
      this.favouriteTracks[id].isFavourite = false;
    } else if (!this.favouriteTracks[id].isFavourite) {
      this.favouriteTracks[id].isFavourite = true;
    }
    this.localStorageSvc.updateFavourites(this.favouriteTracks[id]);
  }

  // on clicking on artist thumbnail app will redirect to artist page with artist id
  goToArtist(id: number): void {
    this.router.navigate(['/artist'], { queryParams: { artistId: id } });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.albumSub.unsubscribe();
  }


}
