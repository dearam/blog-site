import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const token = this.getCookie('jwt'); // Check for the JWT cookie

    if (token) {
      return true; // Allow access if token exists
    } else {
      this.router.navigate(['/login']); // Redirect to login if token does not exist
      return false; // Deny access
    }
  }

  // Function to get a cookie value by name
  private getCookie(name: string): string | null {
    const value = `; ${document.cookie}`; // Prepare the cookie string
    const parts = value.split(`; ${name}=`); // Split by the cookie name
    
    // Check if cookie exists and return its value
    if (parts.length === 2) {
      return parts.pop()?.split(';').shift() || null; // Return the cookie value
    }
    
    return null; // Return null if cookie doesn't exist
  }
}
