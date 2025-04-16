import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { filter } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoginPage: boolean = false;
  isRegisterPage: boolean = false;
  isLoggedIn: boolean = false;
  userId: string | null = null;

  constructor(private router: Router, private authService: AuthService,private snackbar : MatSnackBar) {}

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.isLoginPage = this.router.url === '/login';
      this.isRegisterPage = this.router.url === '/register';
      console.log('isLoginPage:', this.isLoginPage); // Debugging log
      console.log('isRegisterPage:', this.isRegisterPage); // Debugging log
      this.validateToken();
    });

    this.validateToken();
    console.log('isLoggedIn:', this.isLoggedIn); // Debugging log
  } 

  
validateToken(): void {
    const token = localStorage.getItem('jwtToken');
    console.log('Token:', token); // Debugging log
    if (token) {
      this.isLoggedIn = true;
      console.log('isLoggedIn:', this.isLoggedIn); // Debugging log
    } else {
      this.isLoggedIn = false;
    }
  }
  

  logout(): void {
    localStorage.removeItem('jwtToken');
    this.isLoggedIn = false;
    
this.snackbar.open('User logged out successfully', 'Close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });
  
    this.router.navigate(['/login']);
  }
}