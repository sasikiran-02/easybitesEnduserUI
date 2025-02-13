import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  /**
   * ✅ Authenticate user and store token
   */
  login() {
    this.authService
      .login({ email: this.email, password: this.password })
      .subscribe({
        next: () => this.router.navigate(['/dashboard']),
        error: () =>
          (this.errorMessage = 'Invalid credentials. Please try again.'),
      });
  }
}
