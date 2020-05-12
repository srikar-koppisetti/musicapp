import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { IHttpSearchItemResponse } from 'src/app/shared/models/http-response.model';
import { LocalStorageItems, WrapperType } from 'src/app/shared/models/enum.model';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should test updateSearchResults()', () => {
    const message: IHttpSearchItemResponse = {
      artists: [{
          wrapperType: WrapperType.artist,
          artistName: 'slash',
          artistId: '123',
          artworkUrl100: ''
        }
      ],
      albums: [
        {
          wrapperType: WrapperType.collection,
          collectionName: 'apples',
          collectionId: '123',
          artworkUrl100: ''
        }
      ]
    };
    component.updateSearchResults(message);
    expect(component.searchResults).toBe(message);
  });

  it('should test updateSearchItem()', () => {
    const message = 'slash';
    component.updateSearchItem(message);
    expect(component.searchItem).toBe(message);
  });

});
