import Movie from 'src/app/interfaces/movie';

interface Movies extends Movie {
    movies: Array<Movie>;
}

export default Movies;