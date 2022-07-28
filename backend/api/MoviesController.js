// import DAO
import MoviesDAO from '../dao/MoviesDAO.js';

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

    static async apiGetMovieById(req, res, next) {
        try {
            const id = req.params.id || {}; // look for id parameter 

            // call MoviesDAO.getMovieById, which returns specific movie JSON-style
            const movie = await MoviesDAO.getMovieById(id); 
            if(!movie) {
                res.status(404).json({ error: 'not found' });
                return;
            }
            res.json(movie);
        }
        catch(e) {
            console.log(`api,${e}`);
            res.status(500).json({ error: e });
        }
    }

    // call MoviesDAO.apiGetRatings
    static async apiGetRatings(req, res, next) {
        try {
            const propertyTypes = await MoviesDAO.getRatings();
            res.json(propertyTypes);
        }
        catch(e) {
            console.log(`api,${e}`);
            res.status(500).json({ error: e });
        }
    }
}