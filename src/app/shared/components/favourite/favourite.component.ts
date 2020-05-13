import { Component, OnInit, Input } from '@angular/core';
import { faHeart as faRegHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { IFavourite } from '../../models/favourite.model';
import { LocalStorageService } from '../../services/local-storage/local-storage.service';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.scss']
})

// currently favourites are saved in local storage. Ideal way is to save is using a middleware.
export class FavouriteComponent implements OnInit {

  public faRegHeart  = faRegHeart;
  public faHeart = faHeart;
  public size = '2x';
  @Input() favArtist: IFavourite;

  constructor(public localStorageSvc: LocalStorageService) { }

  ngOnInit(): void {
  }

  // check if the marked artist, album and track is favourite or not
  checkIfExists() {
    this.favArtist.isFavourite = this.localStorageSvc.isFavourite(this.favArtist.favId);
  }

  // update marked artist, album and track as favourite
  updateFav() {
    this.localStorageSvc.updateFavourites(this.favArtist);
  }

}
