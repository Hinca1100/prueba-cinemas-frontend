import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../app/services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-movie',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], 
  templateUrl: '../edit-movie/edit-movie.component.html',
  styleUrls: ['../edit-movie/edit-movie.component.scss'],
})
export class EditMovieComponent implements OnInit {
  movieId: string | null = null;
  movieForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // 🔹 Obtiene el ID si existe
    this.movieId = this.route.snapshot.paramMap.get('id');

    this.movieForm = this.fb.group({
      title: ['', Validators.required],
      genre: ['', Validators.required],
      duration: ['', [Validators.required, Validators.min(1)]],
      classification: ['', Validators.required],
    });

    if (this.movieId) {
      // 🔹 Si hay un ID, obtener la película
      this.apiService.getMovieById(this.movieId).subscribe((movie) => {
        if (movie) {
          this.movieForm.patchValue(movie);
        }
      });
    }
  }
  updateMovie(): void {
    if (this.movieForm.valid) {
      this.apiService.updateMovie(this.movieId, this.movieForm.value).subscribe(() => {
        alert('Película actualizada con éxito');
        this.router.navigate(['/movies']);
      });
    }
  }


  saveMovie(): void {
    if (this.movieForm.valid) {
      if (this.movieId) {
        // 🔹 Actualizar si tiene ID
        this.apiService.updateMovie(this.movieId, this.movieForm.value).subscribe(() => {
          alert('Película actualizada con éxito');
          this.router.navigate(['/movies']);
        });
      } else {
        // 🔹 Crear si NO tiene ID
        this.apiService.createMovie(this.movieForm.value).subscribe(() => {
          alert('Película creada con éxito');
          this.router.navigate(['/movies']);
        });
      }
    }
  }
}