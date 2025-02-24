import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-reservation-dialog',
  template: `
    <div class="dialog-container">
      <h2>🎉 ¡Reserva Exitosa! 🎟️</h2>
      <p>Tu reserva fue realizada con éxito. Toda la información ha sido enviada a tu correo electrónico.</p>
      <button mat-raised-button color="primary" (click)="close()">Aceptar</button>
    </div>
  `,
  styles: [`
    .dialog-container {
      text-align: center;
      padding: 20px;
    }
    h2 {
      margin-bottom: 10px;
    }
    p {
      margin-bottom: 20px;
    }
    button {
      width: 100%;
    }
  `]
})
export class ReservationDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<ReservationDialogComponent>
  ) {}

  close(): void {
    this.dialogRef.close();
  }
}