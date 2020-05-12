import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchResultsComponent } from './search-results.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('SearchResultsComponent', () => {
  let component: SearchResultsComponent;
  let fixture: ComponentFixture<SearchResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [ SearchResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should test getAlbum()', () => {
    const id = 124;
    spyOn(component.router, 'navigate');
    component.getAlbum(id);
    expect(component.router.navigate).toHaveBeenCalled();
  });

  it('should test getArtist()', () => {
    const id = 124;
    spyOn(component.router, 'navigate');
    component.getArtist(id);
    expect(component.router.navigate).toHaveBeenCalled();
  });
});
