import { Component, OnDestroy, OnInit } from '@angular/core';
import { MovieDataService } from 'src/app/services/movie.service';
import Movie from 'src/app/interfaces/movie';
import { FormControl } from '@angular/forms';
import { filter, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  // styleUrls: ['./movies-list.component.css']
  providers: [MovieDataService]
})
export class MoviesListComponent implements OnInit, OnDestroy {
  title = new FormControl(''); // represents title field
  ratingsDropdown = new FormControl(); // represents ratings dropdown field
  
  movies: Array<Movie> = []; // hold all movies displayed
  ratings: Array<string> = [];

  subscriptionRatings!: Subscription;
  subscriptionMovies!: Subscription;
}
