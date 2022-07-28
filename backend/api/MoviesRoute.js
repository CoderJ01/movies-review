// file contains different routes to which people can go

import MoviesController from './MoviesController.js';
import ReviewsController from './ReviewsController.js';

export default class MoviesRoute {
    static configRoutes(router) {
        router.route('/').get(MoviesController.apiGetMovies); // call MoviesController.apiGetMovies.
        router.route('/id/:id').get(MoviesController.apiGetMovieById); // retrieve a single movie and its reviews
        router.route('/ratings').get(MoviesController.apiGetRatings); // returns a list of ratings
        router
            .route('/review')
            .post(ReviewsController.apiPostReview) // add review
            .put(ReviewsController.apiUpdateReview) // update (edit) review
            .delete(ReviewsController.apiDeleteReview) // delete review

        return router;
    }
}