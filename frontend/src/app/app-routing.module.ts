import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; // provide essential routing functionalities
import { MoviesListComponent } from './components/movies-list/movies-list.component';
import { MovieComponent } from './components/movie/movie.component';
import { AddReviewComponent } from './components/add-review/add-review.component';
import { LoginComponent } from './components/login/login.component';

// define array of routes 
// declare routes as const to prevent modification (good practice)
const routes: Routes = [
  {
    path: '', // name of role, associated with HTML routerLink
    component: MoviesListComponent
  },
  {
    path: 'movies',
    component: MoviesListComponent
  },
  {
    path: 'movies/review/:id',
    component: AddReviewComponent
  },
  {
    path: 'movies/:id',
    component: MovieComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
];

// forRoot returns a module object which we provide with import
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

// imported in AppModule
export class AppRoutingModule { }
