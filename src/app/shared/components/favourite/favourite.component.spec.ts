import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavouriteComponent } from './favourite.component';
import { LocalStorageService } from '../../services/local-storage/local-storage.service';
import { IFavourite } from '../../models/favourite.model';
import { WrapperType } from '../../models/enum.model';

describe('FavouriteComponent', () => {
  let component: FavouriteComponent;
  let fixture: ComponentFixture<FavouriteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavouriteComponent ],
      providers: [ LocalStorageService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavouriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should test checkIfExists()', () => {
    const favArtist: IFavourite = {
      wrapperType: WrapperType.artist,
      favTitle: 'abc',
      favId: '123',
      favImage: '',
      isFavourite: false
    };
    component.favArtist = favArtist;
    component.checkIfExists();
    expect(component.favArtist.isFavourite).toBeTruthy();
  });

  it('should test updateFav()', () => {
    const favArtist: IFavourite = {
      wrapperType: WrapperType.artist,
      favTitle: 'abc',
      favId: '123',
      favImage: '',
      isFavourite: false
    };
    spyOn(component.localStorageSvc, 'updateFavourites');
    component.favArtist = favArtist;
    component.updateFav();
    expect(component.localStorageSvc.updateFavourites).toHaveBeenCalledWith(favArtist);
  });
});
