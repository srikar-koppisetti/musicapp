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

  getChunk(values: any): any[] {
    return chunk(values, 6);
  }

  getAlbum(id: number): void {
    this.router.navigate(['/album'], { queryParams: { collectionId: id } });
  }

  getArtist(id: number): void {
    this.router.navigate(['/artist'], { queryParams: { artistId: id } });
  }

}
