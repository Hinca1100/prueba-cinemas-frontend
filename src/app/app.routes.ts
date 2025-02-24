import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MoviesComponent } from './pages/movies/movies.component';
import { SeatsComponent } from './pages/seats/seats.component';
import { ReservationComponent } from './pages/reservation/reservation.component';
import { RoomsComponent } from './pages/rooms/rooms.component';
import { EditMovieComponent } from '../components/edit-movie/edit-movie.component';
import { AddMovieComponent } from '../components/add-movie/add-movie.component';

export const routes: Routes = [  
  { path: '', component: HomeComponent },
  { path: 'movies', component: MoviesComponent },
  { path: 'reservations', component: ReservationComponent },
  { path: 'rooms', component: RoomsComponent },
  { path: 'seats', component: SeatsComponent },
  { path: '', redirectTo: '/movies', pathMatch: 'full' },
  { path: 'edit-movie/:id', component: EditMovieComponent },
  { path: '**', redirectTo: '/movies' } ,
  { path: 'add-movie', component: AddMovieComponent },
];