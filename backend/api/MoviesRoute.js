// file contains different routes to which people can go

import MoviesController from './MoviesController.js';

export default class MoviesRoute {
    static configRoutes(router) {
        // router.route('/').get((req, res) => res.send('hello world'));
        router.route('/').get(MoviesController.apiGetMovies); // call MoviesController.apiGetMovies.
        return router;
    }
}