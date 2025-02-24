import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../enviorement';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  private apiUrl : string = environment.apiUrl + '/rooms'; // URL del backend

  constructor(private http: HttpClient) {}

  // Método para obtener todas las salas
  getRooms(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}