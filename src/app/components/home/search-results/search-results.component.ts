import { Component, OnInit, Input } from '@angular/core';
import { IHttpSearchItemResponse } from 'src/app/shared/models/http-response.model';
import { chunk } from '../../../shared/services/utils/utilities';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {

  @Input() searchResults: IHttpSearchItemResponse = {
    albums: [],
    artists: []
  };
  constructor(public router: Router) { }

  ngOnInit(): void {
  }

  // splits the cards into chunks of 6 in-order to display in corosol
  getChunk(values: any): any[] {
    return chunk(values, 6);
  }

  // redirect to album page with album id
  getAlbum(id: number): void {
    this.router.navigate(['/album'], { queryParams: { collectionId: id } });
  }

  // redirect to artist page with artist id
  getArtist(id: number): void {
    this.router.navigate(['/artist'], { queryParams: { artistId: id } });
  }

}
