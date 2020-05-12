import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ArtistComponent } from './components/artist/artist.component';
import { AlbumComponent } from './components/album/album.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { FavouriteComponent } from './shared/components/favourite/favourite.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'artist',
    component: ArtistComponent
  },
  {
    path: 'album',
    component: AlbumComponent
  },
  {
    path: 'fav',
    component: FavouriteComponent
  },
  {
    path: 'page-not-found',
    component: PageNotFoundComponent
  },
  {
    path: '**',
    redirectTo: '/page-not-found',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
