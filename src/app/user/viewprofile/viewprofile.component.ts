import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode'; // Correct import

@Component({
  selector: 'app-viewprofile',
  templateUrl: './viewprofile.component.html',
  styleUrls: ['./viewprofile.component.css']
})
export class ViewProfileComponent implements OnInit {
  user: any = {};

  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const userId = +params['id']; // The '+' converts the string to a number
      this.getUserProfile();
      console.log('user', this.user);
    });
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

  getUserProfile(): void {
    const authId = this.fetchAuthId();
    this.authService.getUserProfile(authId).subscribe(
      (data: any) => {
        this.user = data;
      },
      (error: any) => {
        console.error('Error fetching user profile:', error);
      }
    );
  }

  goBack(): void {
    this.router.navigate(['/course-management']); // Navigate to course management page
  }
}
