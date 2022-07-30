import Review from 'src/app/interfaces/review';

interface Movie extends Review {
    poster: string;
    title: string;
    rated: string;
    plot: string;
    _id: string;
    reviews: Array<Review>;
}

export default Movie;

// Interfaces enforce the structure of data objects that are received. Property names of interfaces map to
// exact property names recieved from backend API