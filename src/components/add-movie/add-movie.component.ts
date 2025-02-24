import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../app/services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-movie',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.scss'],
})
export class AddMovieComponent {
  movieForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router
  ) {
    this.movieForm = this.fb.group({
      title: ['', Validators.required],
      genre: ['', Validators.required],
      duration: ['', [Validators.required, Validators.min(1)]],
    });
  }

  addMovie(): void {
    console.log('Botón presionado, intentando agregar película...'); // 🛠️ Depuración
  
    if (this.movieForm.valid) {
      this.apiService.addMovie(this.movieForm.value).subscribe(() => {
        console.log('Película agregada con éxito'); // 🛠️ Depuración
        alert('Película agregada con éxito');
        this.router.navigate(['/movies']); // Redirige a la lista de películas
      }, error => {
        console.error('Error al agregar película:', error);
        alert('Error al agregar la película');
      });
    } else {
      console.warn('Formulario inválido, revisa los datos.'); // 🛠️ Depuración
    }
  }
}