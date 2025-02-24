import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://localhost:3000'; 

  constructor(private http: HttpClient) {}

  getMovies(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/movies`);
  }

  getMovieById(id: string): Observable<any> { 
    return this.http.get<any>(`${this.apiUrl}/movies/${id}`);
  }

  createMovie(movieData: any) {
    return this.http.post('http://localhost:3000/movies', movieData);
  }

  addMovie(movieData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/movies`, movieData);
  }

  updateMovie(id: any, movie: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/movies/${id}`, movie);
  }

  deleteMovie(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/movies/${id}`);
  }
}