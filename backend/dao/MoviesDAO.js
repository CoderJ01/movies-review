export default class MoviesDAO {
    // store the reference to the database
    static movies;

    // injectDB provides the database refernece to 'movies' parameter
    static async injectDB(conn) {
        if(MoviesDAO.movies) {
             // return if reference already exists
            return;
        }
        try {
            MoviesDAO.movies = await conn.db(process.env.MOVIEREVIEWS_NS)
                .collection('movies');
        }
        catch(e) {
            console.error(`unable to connect in MoviesDAO: ${e}`);
        }
    }
}