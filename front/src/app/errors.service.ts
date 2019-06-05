import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class ErrorsService {

  constructor(public snackBar: MatSnackBar, private zone: NgZone) { }

  public openSnackBar(errorText: string): void {
    this.zone.run(() => {
      const snackBar = this.snackBar.open(errorText, 'OK', {
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
        duration: 5000,
      });
      snackBar.onAction().subscribe(() => {
        snackBar.dismiss();
      });
    });
  }
}
