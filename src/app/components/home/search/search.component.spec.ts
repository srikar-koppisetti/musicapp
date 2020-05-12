import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { SearchComponent } from './search.component';
import { ApiService } from 'src/app/shared/services/api/api.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StoreModule } from '@ngrx/store';
import { TestStore } from 'src/app/shared/services/utils/test-store';
import { Store } from '@ngrx/store';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let store: TestStore<any>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientModule, HttpClientTestingModule, ReactiveFormsModule, StoreModule],
      declarations: [SearchComponent],
      providers: [
        ApiService,
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
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should test getSearchResults()', () => {
    const searchValue = 'john';
    component.searchItem.setValue(searchValue);
    const response = {
      resultCount: 2,
      results: [
        {
          wrapperType: 'track',
          kind: 'song',
          artistId: 469476,
          collectionId: 311629490,
          trackId: 311629509,
          artistName: 'Train',
          collectionName: 'Drops of Jupiter',
          trackName: 'Drops of Jupiter',
          collectionCensoredName: 'Drops of Jupiter',
          trackCensoredName: 'Drops of Jupiter',
          artworkUrl100: 'https://is3-ssl.mzstatic.com/image/thumb/Music/v4/f6/52/96/f6529655-8703-808b-6ef9-e2c9a8be0282/source/100x100bb.jpg'
        },
        {
          wrapperType: 'track',
          kind: 'song',
          artistId: 469476,
          collectionId: 311629490,
          trackId: 311629509,
          artistName: 'Train',
          collectionName: 'Drops of Jupiter',
          trackName: 'Drops of Jupiter',
          collectionCensoredName: 'Drops of Jupiter',
          trackCensoredName: 'Drops of Jupiter',
          artworkUrl100: 'https://is3-ssl.mzstatic.com/image/thumb/Music/v4/f6/52/96/f6529655-8703-808b-6ef9-e2c9a8be0282/source/100x100bb.jpg'
        }
      ]
    };
    store.setState({
      searchItem: searchValue,
      searchResults: response,
      searchError: 'No data found'
    });
    spyOn(component.searchItemEvent, 'emit');
    spyOn(component.searchComponentEvent, 'emit');
    component.getSearchResults(searchValue);
    expect(component.searchItemEvent.emit).toHaveBeenCalledWith(searchValue);
    // expect(component.searchComponentEvent.emit).toHaveBeenCalled();
  });

  it('should test getSearchResults() when empty response', () => {
    const searchValue = 'slash';
    component.searchItem.setValue(searchValue);
    const response = {
      resultCount: 1,
      results: [
        {
          wrapperType: 'collection',
          kind: 'song',
          artistId: 469476,
          collectionId: 311629490,
          trackId: 311629509,
          artistName: 'Train',
          collectionName: 'Drops of Jupiter',
          trackName: 'Drops of Jupiter',
          collectionCensoredName: 'Drops of Jupiter',
          trackCensoredName: 'Drops of Jupiter',
          artworkUrl100: 'https://is3-ssl.mzstatic.com/image/thumb/Music/v4/f6/52/96/f6529655-8703-808b-6ef9-e2c9a8be0282/source/100x100bb.jpg'
        }
      ]
    };
    store.setState({
      searchItem: 'john',
      searchResults: response.results,
      searchError: 'No data found'
    });
    spyOn(component.searchItemEvent, 'emit');
    spyOn(component.searchComponentEvent, 'emit');
    component.getSearchResults('slash');
    expect();
  });

  it('should test searchItemResult()', () => {
    spyOn(component, 'getSearchResults');
    component.searchItemResult();
    expect(component.dataLoading).toBeTruthy();
    expect(component.getSearchResults).toHaveBeenCalled();
  });
});
