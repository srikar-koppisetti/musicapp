import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/shared/services/api/api.service';
import { IHttpSearchItemResponse } from 'src/app/shared/models/http-response.model';
import { WrapperType, LocalStorageItems } from 'src/app/shared/models/enum.model';
import { IAlbum } from 'src/app/shared/models/album.model';
import { IArtist } from 'src/app/shared/models/artist.model';
import { Subscription } from 'rxjs';
import { LocalStorageService } from 'src/app/shared/services/local-storage/local-storage.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../store/app.reducer';
import * as SearchActions from '../../../components/home/store/search.actions';
import { first, take, skip } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {

  @Output() searchComponentEvent = new EventEmitter();
  @Output() searchItemEvent = new EventEmitter();
  public searchItem = new FormControl('');
  public searchResults: IHttpSearchItemResponse;
  private sub: Subscription;
  public dataLoading = false;

  constructor(private localStorageSvc: LocalStorageService, private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.getMostRecentSearch();
  }

  // on search form submit
  searchItemResult(): void {
    this.dataLoading = true;
    const searchItemValue = this.searchItem.value;
    this.getSearchResults(searchItemValue);
  }

  // use the input value and get data using store and creates artists and albums object to display
  getSearchResults(searchItemValue: string) {
    this.searchItemEvent.emit(searchItemValue);
    this.store.dispatch(new SearchActions.SearchItem({ searchItem: searchItemValue }));
    this.sub = this.store.select('search').pipe().subscribe(
      data => {
        if (!!data.searchResults) {
          this.dataLoading = false;
          this.searchResults = {
            albums: [],
            artists: []
          };
          const results = data.searchResults.results;
          results.forEach(element => {
            if (element.wrapperType === WrapperType.track && !!element.collectionId && !!element.artistId) {
              const album: IAlbum = {
                wrapperType: WrapperType.collection,
                collectionId: element.collectionId,
                collectionName: element.collectionName,
                artworkUrl100: element.artworkUrl100
              };
              const artist: IArtist = {
                wrapperType: WrapperType.artist,
                artistId: element.artistId,
                artistName: element.artistName,
                artworkUrl100: element.artworkUrl100
              };
              if (!this.searchResults.albums.some(element => element.collectionId === album.collectionId)) {
                this.searchResults.albums.push(album);
              }
              if (!this.searchResults.artists.some(element => element.artistId === artist.artistId)) {
                this.searchResults.artists.push(artist);
              }
              this.searchComponentEvent.emit(this.searchResults);
            }
          });
        }
      }
    );
  }

  // fetches most recent search from local storage where we store all recent search results
  getMostRecentSearch() {
    const mostRecentSearchItems = this.localStorageSvc.get(LocalStorageItems.recentSearches);
    if (!!mostRecentSearchItems && mostRecentSearchItems.length >= 1) {
      const mostRecentSearchItem = mostRecentSearchItems[mostRecentSearchItems.length - 1];
      this.getSearchResults(mostRecentSearchItem);
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
