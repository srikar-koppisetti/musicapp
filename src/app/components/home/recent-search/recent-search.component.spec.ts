import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentSearchComponent } from './recent-search.component';
import { LocalStorageService } from 'src/app/shared/services/local-storage/local-storage.service';

describe('RecentSearchComponent', () => {
  let component: RecentSearchComponent;
  let fixture: ComponentFixture<RecentSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecentSearchComponent ],
      providers: [LocalStorageService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should test input searchItem', () => {
    const item = 'slash';
    spyOn(component, 'updateResentSearchItems');
    component.searchItem = item;
    expect(component.searchItemValue).toBe(item);
    expect(component.updateResentSearchItems).toHaveBeenCalled();
  });
});
