import { Injectable } from '@angular/core';
import { LocalStorageItems } from '../../models/enum.model';
import { IFavourite } from '../../models/favourite.model';
import { faArrowCircleDown } from '@fortawesome/free-solid-svg-icons';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  // creates an item in local storage
  create(item: LocalStorageItems): void {
    localStorage.setItem(item, '[]');
  }

  // updates the local storage with all recent searches
  update(item: LocalStorageItems, value: string): void {
    if (localStorage.getItem(item) && !!value) {
      const arr = JSON.parse(localStorage.getItem(item));
      if (arr.length < 5 && !arr.includes(value)) {
        arr.push(value);
        localStorage.setItem(item, JSON.stringify(arr));
      } else if (!arr.includes(value)) {
        arr.shift();
        arr.push(value);
        localStorage.setItem(item, JSON.stringify(arr));
      }
    } else if (!!value) {
      this.create(item);
      const arrC = JSON.parse(localStorage.getItem(item));
      arrC.push(value);
      localStorage.setItem(item, JSON.stringify(arrC));
    }
  }

  // updates local storage with all favourite songs, albums and artists selected
  updateFavourites(value: IFavourite) {
    const lsKey = LocalStorageItems.favorites;
    if (localStorage.getItem(lsKey) && !!value) {
      const arr = JSON.parse(localStorage.getItem(lsKey));
      if (arr.length < 5 && value.isFavourite) {
        arr.push(value);
        localStorage.setItem(lsKey, JSON.stringify(arr));
      } else if (arr.length >= 5 && value.isFavourite) {
        arr.shift();
        arr.push(value);
        localStorage.setItem(lsKey, JSON.stringify(arr));
      } else if (!value.isFavourite) {
        for (let i = 0; i < arr.length; i++) {
          const obj = arr[i];
          if (obj.favId === value.favId) {
            arr.splice(i, 1);
          }
        }
        localStorage.setItem(lsKey, JSON.stringify(arr));
      }
    } else if (!!value) {
      this.create(lsKey);
      const arrF = JSON.parse(localStorage.getItem(lsKey));
      arrF.push(value);
      localStorage.setItem(lsKey, JSON.stringify(arrF));
    }
  }

  // checks if a value is favourite or not
  isFavourite(value: string): boolean {
    const arr = JSON.parse(localStorage.getItem(LocalStorageItems.favorites));
    if (!!arr) {
      for ( const item of arr) {
        if (item.favId === value) {
          return true;
        }
      }
    }
    return false;
  }

  // gets the values from local storage
  get(item: LocalStorageItems): any[] {
    const arr = JSON.parse(localStorage.getItem(item));
    return arr;
  }
}
