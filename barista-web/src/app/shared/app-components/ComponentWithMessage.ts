import { MatSnackBar } from '@angular/material/snack-bar';
import { AppInjector } from '@app/shared/app-components/global-injector.module';

export class ComponentWithMessage {
  snackBar: MatSnackBar;

  constructor() {
    this.snackBar = AppInjector.get(MatSnackBar);
  }

  protected showMessage(message: string) {
    this.snackBar.open(message, 'OK', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }
}
