import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../enviorement';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private apiUrl : string = environment.apiUrl + '/reservations'; 
  private reportsUrl : string = environment.apiUrl + '/reports/reservations-detail';

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