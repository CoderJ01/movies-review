import { HttpClient, HttpHeaders } from '@angular/common/http'; // HttpClient provides methods (e.g. get())
import { Injectable } from '@angular/core'; // used to mark MovieDataService as availible for dependency injection (di)
import { Observable } from 'rxjs';  // observable enables notification when data arrives asynchronously
// import Movie from 'src/app/interfaces/movie';
// import Movies from 'src/app/interfaces/movies';

interface Review {
    name: string;
    date: Date;
    review: string;
    user_id: string;
    _id: string;
}

interface Movie extends Review {
    poster: string;
    title: string;
    rated: string;
    plot: string;
    _id: string;
    reviews: Array<Review>;
}

interface Movies extends Movie {
    movies: Array<Movie>;
}

// di supplies instances of classes you depend on
@Injectable()

// functions make API calls to backend endpoints and return the results 
export class MovieDataService {
    constructor(private _http: HttpClient) {}

    // return all movies in for a particular string
    find(query: string, by = 'title', page = 0): Observable<Movies> {
        return this._http.get<Movies>(
            `http://localhost:5000/api/vl/movies?${by}=${query}&page=${page}`
        );
    }

    // gets a specific movie with a supplied id
    get(id: string): Observable<Movie> {
        return this._http.get<Movie>(
            `http://localhost:5000/api/vl/movies/id/${id}`
        );
    }

    createReview(data: any) {
        return this._http.post<any>(
            'http://localhost:5000/api/vl/movies/review',
            data
        );
    }

    updateReview(data: any) {
        return this._http.put('http://localhost:5000/api/vl/movies/review', data)
    }

    deleteReview(review_id: string, user_id: string) {
        const options = {
            headers: new HttpHeaders({
                'Content-Type': 'applications/json'
            }),
            body: {
                review_id: review_id,
                user_id: user_id
            }
        }
        return this._http.delete(
            'http://localhost:5000/api/vl/movies/review',
            options
        );
    }

    getRatings(): Observable<string[]> {
        return this._http.get<string[]>(
            'http://localhost:5000/api/vl/movies/ratings'
        );
    }
}