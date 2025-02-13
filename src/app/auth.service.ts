import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authUrl = 'http://localhost:8083/easybite/auth/authenticate';
  private registerUrl = 'http://localhost:8083/easybite/auth/register';
  private tokenKey = 'authToken';
  private userIdKey = 'userId';
  private userEmailKey = 'userEmail';

  constructor(private http: HttpClient) {}

  /**
   * ✅ Login: Send credentials & store JWT token, userId, and email
   */
  login(credentials: {
    email: string;
    password: string;
  }): Observable<{ token: string; userId: number }> {
    return this.http
      .post<{ token: string; userId: number }>(this.authUrl, credentials)
      .pipe(
        tap((response) => {
          this.storeUserData(
            response.token,
            response.userId,
            credentials.email
          );
        })
      );
  }

  /**
   * ✅ Register: Register user & auto-login after registration
   */
  register(userData: {
    name: string;
    email: string;
    password: string;
    username: string;
  }): Observable<{ token: string; userId: number }> {
    return this.http
      .post<{ token: string; userId: number }>(this.registerUrl, userData)
      .pipe(
        tap((response) => {
          this.storeUserData(response.token, response.userId, userData.email);
        })
      );
  }

  /**
   * ✅ Store token, userId, and email in localStorage
   */
  private storeUserData(token: string, userId: number, email: string) {
    localStorage.setItem(this.tokenKey, token);
    localStorage.setItem(this.userIdKey, userId.toString()); // ✅ Store user ID as string
    localStorage.setItem(this.userEmailKey, email);
  }

  /**
   * ✅ Get stored JWT token
   */
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  /**
   * ✅ Get stored user ID
   */
  getUserId(): number | null {
    const userId = localStorage.getItem(this.userIdKey);
    return userId ? parseInt(userId, 10) : null;
  }

  /**
   * ✅ Get logged-in user's email
   */
  getUserEmail(): string {
    return localStorage.getItem(this.userEmailKey) || '';
  }

  /**
   * ✅ Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  /**
   * ✅ Logout user (Remove token, user ID, and email)
   */
  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userIdKey);
    localStorage.removeItem(this.userEmailKey);
  }
}
