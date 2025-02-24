import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatSortModule, MatIconModule, MatRadioModule],
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  displayedColumns: string[] = ['title', 'genre', 'duration', 'actions']; // ✅ Se añade la columna de acciones
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getMovies().subscribe((data) => {
      this.dataSource.data = data;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // ✅ Método para editar película
  editMovie(movie: any) {
    // Aquí puedes abrir un modal o redirigir a un formulario de edición
  }

  // ✅ Método para eliminar película
  deleteMovie(id: string) {
    console.log('Eliminar película con ID:', id);
    // Aquí puedes agregar la lógica para eliminar la película en el backend
  }
}