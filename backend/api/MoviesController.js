// import DAO
import MoviesDAO from '../dao/MoviesDAO.js';

// 
export default class MoviesController {
    // call apiGetMovies via URL to envoke query string in respose object (req.query)
    static async apiGetMovies(req, res, next) {
        const moviesPerPage = req.query.moviesPerPage ? pareseInt(req.query.moviesPerPage) : 20; // check if moviesPerPage exists
        const page = req.query.page ? parseInt(req.query.page) : 0;


        const filters = {}; // apply no filters initially
        // if rated query string exists, add to filters object
        if(req.query.rated) {
            filters.rated = req.query.rated;
        }
        else if (req.query.title) {
            filters.title = req.query.title;
        }

        // call getMovies in MoviesDAO
        const { moviesList, totalNumMovies } = await MoviesDAO.getMovies(
            { filters, page, moviesPerPage },
        );

        // send JSON response with above response object to whoever calls this URL
        const response = {
            movies: moviesList, 
            page,
            filters,
            entries_per_page: moviesPerPage,
            total_results: totalNumMovies
        };
        res.json(response);
    }
}