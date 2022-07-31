import { Component, OnDestroy, OnInit } from '@angular/core';
import { MovieDataService } from 'src/app/services/movie.service';
import Movie from 'src/app/interfaces/movie';
import { FormControl } from '@angular/forms';
import { filter, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css'],
  providers: [MovieDataService]
})
export class MoviesListComponent implements OnInit, OnDestroy {

  title = new FormControl(''); // represents title field
  ratingsDropdown = new FormControl(); // represents ratings dropdown field
  
  movies?: Array<Movie> = []; // hold all movies to be displayed
  ratings: Array<string> = []; // hold all values to populate ratings dropdown

  currentPage = 0; // keep track of page currently displayed
  currentSearchTitle = ''; // store current user-entered title
  currentSearchRating = ''; // stores rating
  entriesPerPage = '';

  subscriptionRatings!: Subscription;
  subscriptionMovies!: Subscription;

  constructor(private _movieDataService: MovieDataService) {}

  ngOnInit() {
    // calls MovieDataService.getRatings()
    this.subscriptionRatings = this._movieDataService.getRatings()
      .subscribe((data) => {
        this.ratings = data;
      });

    // calls MovieDataService.find to get list of movies and fullfill search critera entered by user
    // filter: make a request when user types 3+ characters
    // prevent backend from being flooded with too many request
    this.title.valueChanges.pipe(filter((text) => text!.length >= 3),
       // wait 400 ms b/w requests
       // distinctUntilChanged, receive Observable only when text is changed
      debounceTime(400), distinctUntilChanged())
      .subscribe((value) => {
        this.currentPage = 0;
        this.currentSearchTitle = value;
        this.currentSearchRating = '';
        this.subscriptionMovies = this._movieDataService.find(value!, "title")
          .subscribe((data) => {
            this.movies = data.movies;
          })
      })
  }

  changeRating(value: string) {
    this.currentPage = 0;
    this.currentSearchRating = value;
    this.currentSearchTitle;
    this.subscriptionMovies = this._movieDataService.find(value, "rated")
      .subscribe((data) => {
        this.movies = data.movies;
        console.log("ratingsDropdown", this.movies);
      })
  }

  ngOnDestroy(): void {
    if(this.subscriptionRatings) {
      this.subscriptionRatings.unsubscribe();
    }
    if(this.subscriptionMovies) {
      this.subscriptionMovies.unsubscribe();
    }
  }

  // increments currentPage, calls MovieDataService.find
  getNextPage() {
    this.currentPage++;
    if(this.currentSearchTitle.length > 0) {
      this.subscriptionMovies = this._movieDataService
      .find(this.currentSearchTitle, 'title', this.currentPage)
      .subscribe((data) => {
        this.movies = data.movies;
      });
    }
    else if (this.currentSearchRating.length > 0) {
      this.subscriptionMovies = this._movieDataService
      .find(this.currentSearchRating, 'rating', this.currentPage)
      .subscribe((data) => {
        this.movies = data.movies;
      })
    }
  }
}
