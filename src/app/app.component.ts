import { Component } from '@angular/core';
import { NavComponent } from '../components/nav.component'; // Asegúrate de la ruta correcta
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavComponent, RouterModule], // Agregamos NavComponent
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {}