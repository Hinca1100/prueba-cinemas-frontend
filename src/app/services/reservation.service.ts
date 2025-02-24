import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private apiUrl = 'http://localhost:3000/reservations'; // URL de reservas
  private reportsUrl = 'http://localhost:3000/reports/reservations-detail'; // URL para obtener detalles de reservas

  constructor(private http: HttpClient) {}

  createReservation(reservation: any): Observable<any> {
    console.log('Enviando reserva:', reservation);
    return this.http.post(this.apiUrl, reservation);
  }

  getOccupiedSeats(roomId: string, schedule: string): Observable<number[]> {
    return new Observable(observer => {
      this.http.get<any[]>(this.reportsUrl).subscribe(reservations => {
        const occupiedSeats = reservations
          .filter(res => res.roomId === roomId && res.schedule === schedule)
          .flatMap(res => res.seats);
        observer.next(occupiedSeats);
        observer.complete();
      });
    });
  }
}