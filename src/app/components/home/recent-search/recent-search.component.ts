import { Component, OnInit, Input } from '@angular/core';
import { LocalStorageService } from 'src/app/shared/services/local-storage/local-storage.service';
import { LocalStorageItems } from 'src/app/shared/models/enum.model';

@Component({
  selector: 'app-recent-search',
  templateUrl: './recent-search.component.html',
  styleUrls: ['./recent-search.component.scss']
})
export class RecentSearchComponent implements OnInit {

  public searchItemValue: string;
  public recentSearchItems: string[] = [];

  @Input()
  set searchItem(val: string) {
    this.searchItemValue = val;
    this.localStorageService.update(LocalStorageItems.recentSearches, this.searchItemValue);
    this.updateResentSearchItems();
  }

  constructor(private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    this.updateResentSearchItems();
  }

  // gets all recent search items from local storage
  updateResentSearchItems(): void {
    this.recentSearchItems = this.localStorageService.get(LocalStorageItems.recentSearches);
  }

}
