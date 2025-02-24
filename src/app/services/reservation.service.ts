import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private apiUrl = 'http://localhost:3000/reservations'; // URL correcta

  constructor(private http: HttpClient) {}

  createReservation(reservation: any): Observable<any> {
    console.log('Enviando reserva:', reservation); 
    return this.http.post(this.apiUrl, reservation);
  }
}