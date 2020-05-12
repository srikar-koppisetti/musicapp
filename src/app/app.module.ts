import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import * as fromApp from '../app/store/app.reducer';
import { SearchEffect } from './components/home/store/search.effects';
import { AlbumEffect } from './components/album/store/album.effects';
import { ArtistEffect } from './components/artist/store/artist.effects';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ArtistComponent } from './components/artist/artist.component';
import { AlbumComponent } from './components/album/album.component';
import { SearchComponent } from './components/home/search/search.component';
import { SearchResultsComponent } from './components/home/search-results/search-results.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RecentSearchComponent } from './components/home/recent-search/recent-search.component';
import { FavouriteComponent } from './shared/components/favourite/favourite.component';
import { FavouritesComponent } from './components/home/favourites/favourites.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ArtistComponent,
    AlbumComponent,
    SearchComponent,
    SearchResultsComponent,
    PageNotFoundComponent,
    RecentSearchComponent,
    FavouriteComponent,
    FavouritesComponent,
    NavBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([SearchEffect, AlbumEffect, ArtistEffect]),
    StoreDevtoolsModule.instrument({
      maxAge: 25
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
