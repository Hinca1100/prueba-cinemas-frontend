import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:3000'; // Asegúrate de que coincide con el backend

  constructor(private http: HttpClient) {}

  getMovies(): Observable<any> {
    return this.http.get(`${this.baseUrl}/movies`);
  }

  createReservation(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/reservations`, data);
  }
}