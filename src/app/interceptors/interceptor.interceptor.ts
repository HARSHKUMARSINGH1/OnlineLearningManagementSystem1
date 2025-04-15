import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptorInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const tokenObject = localStorage.getItem('jwtToken'); // Get token object from localStorage

    if (tokenObject) {
      const token = JSON.parse(tokenObject).jwtToken; // Parse the token object and extract the token string

      // Clone the request to add the Authorization header
      const clonedRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}` // Add the token to Authorization header
        }
      });

      return next.handle(clonedRequest);
    }

    return next.handle(request); // Proceed without modifying the request if no token
  }
}
