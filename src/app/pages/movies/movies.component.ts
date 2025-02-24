import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatRadioModule,
    MatSnackBarModule,
  ],
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit {
  displayedColumns: string[] = ['title', 'genre', 'duration', 'actions']; // ✅ Se añade la columna de acciones
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private apiService: ApiService, private router: Router, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.apiService.getMovies().subscribe((data) => {
      console.log('Películas obtenidas:', data); // 🔍 Verifica que data sean objetos
  
      if (!Array.isArray(data) || data.some(movie => typeof movie !== 'object')) {
        console.error('Error: Los datos recibidos no son válidos', data);
        return;
      }
  
      this.dataSource.data = data;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // ✅ Cargar las películas
  getMovies(): void {
    this.apiService.getMovies().subscribe((data) => {
      this.dataSource.data = data;
    });
  }

  addMovie() {
    this.router.navigate(['/edit-movie']); // Navega sin ID
  }

  // ✅ Método para editar película
  editMovie(movie: any) {
    console.log('Datos de la película:', movie); // 🔍 Verifica si es un objeto
  
    if (!movie || typeof movie !== 'object') {
      console.error('Error: movie no es un objeto válido', movie);
      return;
    }
  
    const movieId = movie._id || movie.id; // ✅ Usa _id del backend
  
    if (!movieId) {
      console.error('Error: La película no tiene un ID válido', movie);
      return;
    }
  
    this.router.navigate(['/edit-movie', movieId]);
  }

  // ✅ Método para eliminar película
  deleteMovie(id: string) {
    if (confirm('¿Estás seguro de que quieres eliminar esta película?')) {
      this.apiService.deleteMovie(id).subscribe(() => {
        this.dataSource.data = this.dataSource.data.filter(movie => movie._id !== id);
      });
    }
  }
}