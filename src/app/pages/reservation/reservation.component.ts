import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { RoomService } from '../../services/room.service';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [
    CommonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
  ],
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss'],
})
export class ReservationComponent implements OnInit {
  movies: any[] = [];
  rooms: any[] = [];
  selectedMovie: any;
  selectedRoom: any;
  selectedDate!: Date | null;
  selectedTime: string = '';

  // Lista de horarios disponibles
  availableTimes: string[] = ['12:00', '15:00', '18:00', '21:00'];

  constructor(
    private apiService: ApiService,
    private roomService: RoomService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadMovies();
    this.loadRooms();
  }

  loadMovies(): void {
    this.apiService.getMovies().subscribe((data) => {
      console.log('Películas cargadas:', data);
      this.movies = data;
    });
  }

  loadRooms(): void {
    this.roomService.getRooms().subscribe((data) => {
      console.log('Salas cargadas:', data);
      this.rooms = data;
    });
  }

  // Validar que la fecha no sea pasada
  validateDate(): void {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (this.selectedDate && this.selectedDate < today) {
      alert('No puedes seleccionar una fecha pasada.');
      this.selectedDate = null;
    }
  }

  proceedToSeats(): void {
    if (
      this.selectedMovie &&
      this.selectedRoom &&
      this.selectedDate &&
      this.selectedTime
    ) {
      const selectedDateTime = new Date(this.selectedDate);
      const [hours, minutes] = this.selectedTime.split(':').map(Number);
      selectedDateTime.setHours(hours, minutes, 0, 0);

      const queryParams = {
        movie: this.selectedMovie?._id,
        room: this.selectedRoom?._id,
        dateTime: selectedDateTime.toISOString(),
      };

      console.log('🟢 Enviando parámetros a /seats:', queryParams);

      this.router.navigate(['/seats'], { queryParams });
    } else {
      console.error('❌ Error: Faltan datos en la reserva.');
      alert(
        'Por favor, selecciona una película, una sala, una fecha y un horario.'
      );
    }
  }
}
