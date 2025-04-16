import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode'; // Correct import
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-updateprofile',
  templateUrl: './updateprofile.component.html',
  styleUrls: ['./updateprofile.component.css']
})
export class UpdateProfileComponent implements OnInit {
  name: string = '';
  email: string = '';
  password: string = ''; // Keep password in the component
  role: string = '';

  constructor(private profileService: AuthService, private router: Router, private snackbar: MatSnackBar) {}

  ngOnInit(): void {
    this.loadProfileData();
  }

  fetchAuthId(): string {
    const token = localStorage.getItem('jwtToken');
    let authId = '';
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        authId = decodedToken.sub; // Adjust this based on your token structure
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
    return authId;
  }

  loadProfileData() {
    const authId = this.fetchAuthId();
    if (authId) {
      this.profileService.getUserProfile(authId).subscribe(
        profile => {
          this.name = profile.name;
          this.email = profile.email;
          this.password = profile.password; // Load password but don't display it
          this.role = profile.role;
        },
        error => {
          console.error('There was an error loading the profile data!', error);
        }
      );
    }
  }

  updateProfile() {
    const profileData = {
      name: this.name,
      email: this.email,
      password: this.password, // Send password to backend
      role: this.role
    };

    this.profileService.updateProfile(profileData).subscribe(
      response => {
        this.snackbar.open('Profile updated successfully', 'Close', {
                duration: 3000,
                horizontalPosition: 'center',
                verticalPosition: 'bottom',
                panelClass : ['custom-snackbar']
              });
        console.log('Profile updated successfully:', response);
        this.router.navigate(['/profile']); // Navigate to view profile page after update
      },
      error => {
        console.error('There was an error updating the profile!', error);
      }
    );
  }

  goBack() {
    this.router.navigate(['/profile']); // Navigate to view profile page
  }
}
