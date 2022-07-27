// file contains different routes to which people can go

import MoviesController from './MoviesController.js';
import ReviewsController from './ReviewsController.js';

export default class MoviesRoute {
    static configRoutes(router) {
        router.route('/').get(MoviesController.apiGetMovies); // call MoviesController.apiGetMovies.
        router
            .route('/review')
            .post(ReviewsController.apiPostReview) // add review
            .put(ReviewsController.apiUpdateReview) // update (edit) review
            .delete(ReviewsController.apiDeleteReview) // delete review

        return router;
    }
}