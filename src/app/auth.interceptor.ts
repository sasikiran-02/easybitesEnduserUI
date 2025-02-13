import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  debugger;
  const authService = inject(AuthService); // ✅ Dynamically inject AuthService
  const token = localStorage.getItem('authToken'); // ✅ Retrieve token dynamically
  const authUrls = [
    'http://localhost:8083/easybite/auth/authenticate',
    'http://localhost:8083/easybite/auth/register',
  ];

  console.log('Intercepting request to:', req.url);

  // ✅ Skip adding the token for authentication requests
  if (authUrls.includes(req.url)) {
    console.log('Skipping Authorization header for authentication request.');
    return next(req);
  }
  console.log('Intercepting request to:', req.url);

  // ✅ Add Authorization header if token exists
  if (token) {
    console.log('Adding Authorization header. Token:', token);
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next(clonedRequest);
  }

  console.log('No token found. Sending request without Authorization header.');
  return next(req);
};
