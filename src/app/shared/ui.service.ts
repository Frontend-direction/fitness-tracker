import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';

@Injectable()
export class UIService {
  loadingStateChanged = new Subject<boolean>();

  constructor(private snack: MatSnackBar) {

  }

  showSnackbar(message, action, duration) {
    this.snack.open(message, action, {
      duration,
    })
  }
}