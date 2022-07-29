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
  
  movies: Array<Movie> = []; // hold all movies to be displayed
  ratings: Array<string> = []; // hold all values to populate ratings dropdown

  subscriptionRatings!: Subscription;
  subscriptionMovies!: Subscription;

  constructor(private_movieDataService: MovieDataService) {}

  ngOnInit() {
    // calls MovieDataService.getRatings()
    this.subscriptionRatings = this._movieDataService.getRatings()
      .subscribe((data) => {
        this.ratings = data;
      });

    // calls MovieDataService.find to get list of movies and fullfill search critera entered by user
    // filter: make a request when user types 3+ characters
    // prevent backend from being flooded with too many request
    this.title.valueChanges.pipe(filter((text) => text.length >= 3),
       // wait 400 ms b/w requests
       // distinctUntilChanged, receive Observable only when text is changed
      debounceTime(400), distinctUntilChanged())
      .subscribe((value) => {
        this.subscriptionMovies = this.movieDataService.find(value, "title")
          .subscribe((data) => {
            this.movies = data.movies;
          })
      })
  }
}
