import mongodb from 'mongodb';

export default class MoviesDAO {
    // store the reference to the database
    static movies;

    static ObjectId = mongodb.ObjectId;

    // injectDB provides the database refernece to 'movies' parameter
    static async injectDB(conn) {
        if(MoviesDAO.movies) {
             // return if reference already exists
            return;
        }
        // ... or else
        try {
            // connect to database
            MoviesDAO.movies = await conn.db(process.env.MOVIEREVIEWS_NS)
                .collection('movies');
        }
        catch(e) {
            console.error(`unable to connect in MoviesDAO: ${e}`);
        }
    }

    static async getMovies({ // default filter
        filters = null, // no filters
        page = 0, // results retrieved at page 0
        moviesPerPage = 20, // will get only 20 movies at once
    } = {}) {
        let query;
        if(filters) {
            // filters resilts by movie title
            if('title' in filters) {
                query = { $text: { $search: filters.title} };
            }
            // filter results by movie rating
            else if ('rated' in filters) {
                query = { rated: { $eq: filters.rated } } // 'eq' short for 'equal', value comparison
            }
            // Example:
            // {
            //     title: "dragon", // search titles with dragon in it
            //     rated: "G" // search ratings with 'G'
            // }  
        }
        // cursor assignment of movies reduces memory consumption and bandwidth usage of potentially
        //  large document sets
        let cursor;
        try {
            cursor = await MoviesDAO.movies
                .find(query)
                .limit(moviesPerPage)
                // skip applies first when used with limit
                .skip(moviesPerPage * page);
            const moviesList = await cursor.toArray();
            const totalNumMovies = await MoviesDAO.movies.countDocuments(query);
            return {moviesList, totalNumMovies };
        }
        catch(e) {
            console.error(`Unable to issue find command, ${e}`);
            return {moviesList: [], totalNumMovies: 0 }
        }
    }

    // get ratings
    static async getRatings() {
        let ratings = [];
        try {
            ratings = await MoviesDAO.movies.distinct('rated');
            return ratings;
        }
        catch(e) {
            console.log(`unable to get ratings, ${e}`);
            return ratings;
        }
    }

    static async getMovieById(id) {
        try {
            return await MoviesDAO.movies.aggregate([ // 'aggregate' provides sequence of data aggregation operations
                {
                    // look for movie document that matches the specific id
                    $match: {
                        _id: new MoviesDAO.ObjectId(id)
                    }
                }, 
                {
                    // perform equality join using '_id' from movie doc and 'movie_id' from form reviews collection
                    // find reviews w/ specific movie id and return movie together with reviews in an array
                    $lookup: 
                    {
                        from: 'reviews',
                        localField: '_id',
                        foreignField: 'movie_id',
                        as: 'reviews'
                    }
                }
            ]).next();
        }
        catch(e) {
            console.error(`something went wrong in getMovieById: ${e}`);
            throw e;
        }
    }
}