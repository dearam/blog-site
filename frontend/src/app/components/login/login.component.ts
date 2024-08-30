import { Component } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email = '';
  password = '';
  emailError = false;
  passwordError = false;
  emsg = '';
  pmsg = '';
  authStatus=true;

  constructor(private authService: AuthService, private router: Router, private cookieService: CookieService) {}

  ngOnInit(){
    const token = this.cookieService.get('jwt');
    this.authStatus=!!token;
  }
  onSubmit() {
    this.resetErrors();

    if (!this.validateInputs()) return; // Exit if validation fails

    this.authService.login(this.email, this.password).subscribe({
      next: (response) => this.handleLoginSuccess(response),
      error: (error) => this.handleError(error),
    });
  }

  private validateInputs(): boolean {
    this.emailError = !this.email;
    this.passwordError = !this.password;

    this.emsg = this.emailError ? 'Email required!' : '';
    this.pmsg = this.passwordError ? 'Password required!' : '';

    return !(this.emailError || this.passwordError); // Return true if valid
  }

  private resetErrors() {
    this.emailError = false;
    this.passwordError = false;
    this.emsg = '';
    this.pmsg = '';
  }

  private handleLoginSuccess(response: any) {
    console.log('Login successful', response);
    const token = this.cookieService.get('jwt');
    
    if (token) {
      console.log('Token exists:', token);
      this.router.navigate(['/home']);
    } else {
      console.error('No token found');
      this.emsg = 'Authentication failed';
      this.emailError = true; // Assume email error for failed authentication
    }
  }

  private handleError(error: any) {
    const errorMessage = error.message;
    
    if (errorMessage === "user not found") {
      this.emsg = errorMessage;
      this.emailError = true;
    } else {
      this.pmsg = errorMessage;
      this.passwordError = true;
    }

    console.log('Error message:', errorMessage);
  }

  
}
