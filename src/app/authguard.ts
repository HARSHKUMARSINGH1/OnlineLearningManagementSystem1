import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router,private snackbar: MatSnackBar) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      this.snackbar.open('Please login to access this page!', 'Close', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass : ['custom-snackbar']
            });
      return false;
    }
  }
}
