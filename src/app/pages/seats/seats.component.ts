import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ReservationService } from '../../services/reservation.service';

@Component({
  selector: 'app-seats',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatSnackBarModule],
  templateUrl: './seats.component.html',
  styleUrls: ['./seats.component.scss'],
})
export class SeatsComponent implements OnInit {
  movieId!: string;
  roomId!: string;
  dateTime!: string;
  seats: boolean[][] = [];
  selectedSeats: number[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private reservationService: ReservationService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.movieId = params['movie'];
      this.roomId = params['room'];
      this.dateTime = params['dateTime']; 

      if (!this.movieId || !this.roomId || !this.dateTime) {
        this.snackBar.open('Error: Faltan datos de la reserva.', 'Cerrar', {
          duration: 3000,
        });
        this.router.navigate(['/reservations']);
      }
    });

    this.generateSeats(5, 10); // 5 filas, 10 columnas
  }

  generateSeats(rows: number, cols: number): void {
    this.seats = Array(rows)
      .fill(null)
      .map(() => Array(cols).fill(false));
  }

  toggleSeat(row: number, col: number): void {
    const seatIndex = row * this.seats[0].length + col;
    if (this.selectedSeats.includes(seatIndex)) {
      this.selectedSeats = this.selectedSeats.filter((s) => s !== seatIndex);
    } else {
      this.selectedSeats.push(seatIndex);
    }
    this.seats[row][col] = !this.seats[row][col];
  }

  confirmReservation(): void {
    if (this.selectedSeats.length === 0) {
      this.snackBar.open(
        'Por favor, selecciona al menos un asiento.',
        'Cerrar',
        { duration: 3000 }
      );
      return;
    }

    // ✅ Verifica si `dateTime` es válido antes de convertirlo
    const selectedDateTime = new Date(this.dateTime);
    if (isNaN(selectedDateTime.getTime())) {
      this.snackBar.open('Error: Fecha inválida.', 'Cerrar', {
        duration: 3000,
      });
      return;
    }

    const reservationData = {
      movieId: this.movieId,
      roomId: this.roomId,
      schedule: selectedDateTime.toISOString(), // ✅ Se usa `ISO` correctamente
      seats: this.selectedSeats.map((seat) => Number(seat)),
    };

    console.log('Enviando reserva:', reservationData);

    this.reservationService
      .createReservation(reservationData)
      .subscribe((response) => {
        this.snackBar.open(
          'Reserva confirmada. Se ha enviado un correo.',
          'Cerrar',
          { duration: 3000 }
        );
        this.router.navigate(['/']);
      });
  }
}
