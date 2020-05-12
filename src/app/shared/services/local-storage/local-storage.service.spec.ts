import { TestBed } from '@angular/core/testing';

import { LocalStorageService } from './local-storage.service';
import { LocalStorageItems, WrapperType } from '../../models/enum.model';

describe('LocalStorageService', () => {
  let service: LocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageService);

    let store = {};

    spyOn(localStorage, 'getItem').and.callFake((key) => {
      return store[key];
    });
    spyOn(localStorage, 'setItem').and.callFake((key, value) => {
      return store[key] = value + '';
    });
    spyOn(localStorage, 'clear').and.callFake(() => {
      store = {};
    });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should test create()', () => {
    const key = LocalStorageItems.favorites;
    service.create(key);
    expect(localStorage.setItem).toHaveBeenCalled();
  });

  it('should test update()', () => {
    spyOn(service, 'create');
    const key = LocalStorageItems.recentSearches;
    const value = 'slash';
    localStorage.setItem(key, '[]');
    service.update(key, value);
    expect(localStorage.setItem).toHaveBeenCalled();
  });

  it('should test update() search local storage length < 5', () => {
    spyOn(service, 'create');
    const key = LocalStorageItems.recentSearches;
    const value = 'd';
    localStorage.setItem(key, '["a","b","c"]');
    service.update(key, value);
    expect(localStorage.setItem).toHaveBeenCalled();
  });

  it('should test update() search local storage length < 5 and value includes', () => {
    spyOn(service, 'create');
    const key = LocalStorageItems.recentSearches;
    const value = 'c';
    localStorage.setItem(key, '["a","b","c"]');
    service.update(key, value);
    expect(localStorage.setItem).toHaveBeenCalled();
  });

  it('should test isFavourite()', () => {
    spyOn(service, 'isFavourite');
    const key = LocalStorageItems.favorites;
    const fav = [
      {
        wrapperType: WrapperType.artist,
        favTitle: 'abc',
        favId: '123',
        favImage: '',
        isFavourite: true
      },
      {
        wrapperType: WrapperType.artist,
        favTitle: 'abcd',
        favId: '1234',
        favImage: '',
        isFavourite: true
      }
    ];
    localStorage.setItem(key, JSON.stringify(fav));
    const result = service.isFavourite('12345');
    expect(result).toBeFalsy();
  });

  it('should test isFavourite() false', () => {
    spyOn(service, 'isFavourite');
    const key = LocalStorageItems.favorites;
    const fav = [
      {
        wrapperType: WrapperType.artist,
        favTitle: 'abc',
        favId: '123',
        favImage: '',
        isFavourite: true
      },
      {
        wrapperType: WrapperType.artist,
        favTitle: 'abcd',
        favId: '1234',
        favImage: '',
        isFavourite: true
      }
    ];
    localStorage.setItem(key, JSON.stringify(fav));
    const result = service.isFavourite('123');
    expect(result).toBeFalsy();
  });
});
