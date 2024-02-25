import {Injectable} from "@angular/core";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";

const successConfig: MatSnackBarConfig = {
  duration: 3000,
  horizontalPosition: 'right',
  verticalPosition: 'top',
  panelClass: 'success-snackbar',
};

const errorConfig: MatSnackBarConfig = {
  duration: 5000,
  horizontalPosition: 'right',
  verticalPosition: 'top',
  panelClass: 'error-snackbar',
};

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  constructor(
   private snackBar: MatSnackBar
  ) { }

  public openSnackbar(message: string, type: 'success' | 'error'): void {
    const config = type === 'success' ? successConfig : errorConfig;
    this.snackBar.open(message, undefined, config);
  }
}
