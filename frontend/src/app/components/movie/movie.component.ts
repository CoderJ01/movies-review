import { Component, OnDestroy, OnInit } from '@angular/core';
import { MovieDataService } from '../../services/movie.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import Movie from 'src/app/interfaces/movies';
import * as moment from 'moment';
import User from 'src/app/interfaces/user';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css'],
  providers: [MovieDataService]
})
export class MovieComponent implements OnInit, OnDestroy {
  id = '';
  subscription!: Subscription;
  start = new Date(Date.now());

  // hold specific movie shown
  movie: Movie = {
    poster: '',
    title: '',
    rated: '',
    plot: '',
    _id: '',
    reviews: [],
    movies: [],
    name: '',
    date: this.start,
    review: '',
    user_id: ''
  };

  // use dependency injection to get an instance of MovieDataService, ..., and Router
  constructor(
    private _movieDataService: MovieDataService,
    private _route: ActivatedRoute /* contains component route info */,
    private _router: Router,
    private _loginService: LoginService
  ) {}

  get userInfo(): User {
    return this._loginService.user;
  }

  ngOnInit(): void {
    this.subscription = this._route.params.subscribe((params) => {
      this.id = params['id']; // get paramter values
      // call get() of MovieDataService
      this._movieDataService.get(this.id).subscribe((data) => {
        this.movie = data;
      })
    })
  }

  ngOnDestroy(): void {
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  getFormattedDate(date: Date) {
    return moment(date).format("Do MMMM YYYY");
  }

  deleteReview(reviewId: string) {
    this._movieDataService
      .deleteReview(reviewId, this._loginService.user.id)
      // filter creates new array will all test-passing elements
      // new review arrays will not contain reviews marked for deletion
      .subscribe((response) => {
        this.movie.reviews = this.movie.reviews.filter(
          ({ _id }) => _id !== reviewId
        );
      })
  }
}
