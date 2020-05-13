import { Component, OnInit, OnDestroy, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { QueryParams, WrapperType } from 'src/app/shared/models/enum.model';
import { ApiService } from 'src/app/shared/services/api/api.service';
import { IArtist } from 'src/app/shared/models/artist.model';
import { IFavourite } from 'src/app/shared/models/favourite.model';
import { EventEmitter } from 'protractor';
import { LocalStorageService } from 'src/app/shared/services/local-storage/local-storage.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as ArtistActions from './store/artist.action';


@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss']
})
export class ArtistComponent implements OnInit, OnDestroy {

  public artistId: string;
  private sub: Subscription;
  private artistSub: Subscription;
  public artist: IArtist;
  public albums: any[];
  public displayArtist: any;
  public favouriteArtist: IFavourite;

  constructor(public route: ActivatedRoute,
    private apiService: ApiService,
    public router: Router,
    private localStorageSvc: LocalStorageService,
    public store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.sub = this.route.queryParamMap
      .subscribe(
        (data) => {
          this.artistId = data.get(QueryParams.artistId);
        }
      );

    this.getArtist(this.artistId);
  }

  // gets all the data needs to be displayed in artist page from store
  getArtist(artistId: string): void {
    this.store.dispatch(new ArtistActions.ArtistIteam({ artistItem: artistId }));
    this.artistSub = this.store.select('artist').pipe().subscribe(
      (data) => {
        const artistResults = data.artistResults;
        if (!!data.artistResults && artistResults !== undefined && artistId == artistResults.results[0].artistId ) {
          if (artistResults.resultCount < 2) {
            this.router.navigate(['/page-not-found']);
          }
          if (artistResults.results[0].wrapperType === WrapperType.artist 
            && artistResults.resultCount >= 2) {
            this.displayArtist = true;
            const response = artistResults.results;
            this.artist = {
              wrapperType: response[0].wrapperType,
              artistId: response[0].artistId,
              artistName: response[0].artistName,
              artworkUrl100: response[1].artworkUrl100
            };
            this.albums = response.slice(1);
            this.checkIsFavourite();
          }
        }
      }
    );
  }

  // on selecting one of the artist on the view. It redirects to album page with album id
  goToAlbum(id: number): void {
    this.router.navigate(['/album'], { queryParams: { collectionId: id } });
  }

  // checks if the artist is favourite from local storage
  checkIsFavourite() {
    if (!!this.artist) {
      this.favouriteArtist = {
        wrapperType: this.artist.wrapperType,
        favTitle: this.artist.artistName,
        favId: this.artist.artistId,
        favImage: this.artist.artworkUrl100,
        isFavourite: false
      };
      this.favouriteArtist.isFavourite = this.localStorageSvc.isFavourite(this.favouriteArtist.favId);
    }
  }

  // on marking artist as favourite, pushes artist data to favourites in local storage
  pushFavArtist(): void {
    if (this.favouriteArtist.isFavourite) {
      this.favouriteArtist.isFavourite = false;
    } else if (!this.favouriteArtist.isFavourite) {
      this.favouriteArtist.isFavourite = true;
    }
    this.localStorageSvc.updateFavourites(this.favouriteArtist);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.artistSub.unsubscribe();
  }

}
