import { Component, OnInit } from '@angular/core';
import { IHttpSearchItemResponse } from 'src/app/shared/models/http-response.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public searchResults: IHttpSearchItemResponse;
  public searchItem: string;

  constructor() { }

  ngOnInit(): void {
  }

  updateSearchResults(message: IHttpSearchItemResponse) {
    this.searchResults = message;
  }

  updateSearchItem(message: string) {
    this.searchItem = message;
  }

}
