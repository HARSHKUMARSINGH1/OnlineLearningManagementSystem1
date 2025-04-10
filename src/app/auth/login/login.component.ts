import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service'; // Ensure this path is correct
import { Router } from '@angular/router';
import {jwtDecode} from 'jwt-decode'; // Correct import

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  onLogin() {
    console.log('Login button clicked');
    const credentials = { username: this.username, password: this.password };
    this.authService.login(credentials).subscribe((response: any) => {
      console.log('Login successful', response);
      const token = response; // Extract the jwtToken from the response
      console.log('token', token);
      localStorage.setItem('jwtToken', token); // Store JWT token as a string
      console.log('token', token);
      try {
        const decodedToken: any = jwtDecode(token);
        console.log(decodedToken);
      } catch (error) {
        console.error('Error decoding token:', error);
      }
      this.router.navigateByUrl('/course-management'); // Redirect to a protected route
    }, (error: any) => {
      console.error('Login error', error);
      alert('Login failed. Please try again.');
    });
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }
}
