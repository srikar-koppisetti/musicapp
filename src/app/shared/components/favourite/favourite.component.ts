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
export class FavouriteComponent implements OnInit {

  public faRegHeart  = faRegHeart;
  public faHeart = faHeart;
  public size = '2x';
  @Input() favArtist: IFavourite;

  constructor(public localStorageSvc: LocalStorageService) { }

  ngOnInit(): void {
  }

  checkIfExists() {
    this.favArtist.isFavourite = this.localStorageSvc.isFavourite(this.favArtist.favId);
    console.log(this.favArtist);
  }

  updateFav() {
    this.localStorageSvc.updateFavourites(this.favArtist);
    console.log(this.favArtist);
  }

}
