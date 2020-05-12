import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/shared/services/local-storage/local-storage.service';
import { LocalStorageItems } from 'src/app/shared/models/enum.model';
import { IFavourite } from 'src/app/shared/models/favourite.model';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss']
})
export class FavouritesComponent implements OnInit {

  public allFavourites: IFavourite[] = [];

  constructor(private localStorageSvc: LocalStorageService) { }

  ngOnInit(): void {
    this.getAllFavourites();
  }

  getAllFavourites(): void {
    this.allFavourites = this.localStorageSvc.get(LocalStorageItems.favorites);
  }

}
