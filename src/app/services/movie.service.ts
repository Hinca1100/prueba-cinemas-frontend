import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../enviorement';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiUrl : string = environment.apiUrl + '/movies'; 

  constructor(private http: HttpClient) {}

  getMovies(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}