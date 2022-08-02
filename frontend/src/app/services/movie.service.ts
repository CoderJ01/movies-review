import { HttpClient, HttpHeaders } from '@angular/common/http'; // HttpClient provides methods (e.g. get())
import { Injectable } from '@angular/core'; // used to mark MovieDataService as availible for dependency injection (di)
import { Observable } from 'rxjs';  // observable enables notification when data arrives asynchronously
import Movie from 'src/app/interfaces/movie';
import Movies from 'src/app/interfaces/movies';

// di supplies instances of classes you depend on
@Injectable()

// functions make API calls to backend endpoints and return the results 
export class MovieDataService {
    constructor(private _http: HttpClient) {}

    // return all movies in for a particular string
    find(query: string, by = 'title', page = 0): Observable<Movies> {
        return this._http.get<Movies>(
            `http://localhost:5000/api/v1/movies?${by}=${query}&page=${page}`
        );
    }

    // gets a specific movie with a supplied id
    get(id: string): Observable<Movie> {
        return this._http.get<Movie>(
            `http://localhost:5000/api/v1/movies/id/${id}`
        );
    }

    createReview(data: any) {
        return this._http.post<any>(
            'http://localhost:5000/api/v1/movies/review',
            data
        );
    }

    updateReview(data: any) {
        return this._http.put('http://localhost:5000/api/v1/movies/review', data)
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
            'http://localhost:5000/api/v1/movies/review',
            options
        );
    }

    getRatings(): Observable<string[]> {
        return this._http.get<string[]>(
            'http://localhost:5000/api/v1/movies/ratings'
        );
    }
}