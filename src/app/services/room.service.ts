import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  private apiUrl = 'http://localhost:3000/rooms'; // URL del backend

  constructor(private http: HttpClient) {}

  // Método para obtener todas las salas
  getRooms(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}