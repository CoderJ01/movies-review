import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';
import { MovieDataService } from 'src/app/services/movie.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.css']
})
export class AddReviewComponent implements OnInit, OnDestroy {
  editing = false; // 'true' when component is in editing mode; false, review add
  id = '';
  subscriptionParams!: Subscription;
  subscriptionMovieService!: Subscription;
  submitted = 'false';

  // keep track of review submitted
  form = new FormGroup({
    review: new FormControl('');
  });

  constructor(
    private _route: ActivatedRoute,
    private _loginService: LoginService,
    private _movieDataService: MovieDataService
  ) { 
    this.subscriptionParams = this._route.params.subscribe((params) => {\
      this.id = params['id']
    });
  }

  ngOnInit(): void {  }

  saveReview() {
    // review properties
    const data = {
      review: this.form.controls['review'].value,
      name: this._loginService.user.name,
      user_id: this._loginService.user.id,
      movie_id: this.id, // get movie id directly from url
      review_id: ''
    }

    this.subscriptionMovieService = this._movieDataService
      .createReview(data)
      .subscribe((response) => {
        this.submitted = true;
      })
  }

  ngOnDestroy(): void {
    if(this.subscriptionParams) {
      this.subscriptionParams.unsubscribe();
    }

    if(this.subscriptionMovieService) {
      this.subscriptionMovieService.unsubscribe();
    }
  }

}
