import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  role: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  onRegister() {
  const user = { name: this.name, email: this.email, password: this.password, role: this.role };
  this.authService.register(user).subscribe(response => {
    console.log('User registered successfully', response);
    alert(response); // Display the response message
    console.log('Navigating to login page');
    this.router.navigateByUrl('/login').then(success => {
      console.log('Navigation success:', success);
    }).catch(err => {
      console.error('Navigation error:', err);
    });
  }, error => {
    console.error('Registration error', error);
    alert('Registration failed. Please try again.');
  });
}
onClear() {
  this.name = '';
  this.email = '';
  this.password = '';
  this.role = '';
}
}