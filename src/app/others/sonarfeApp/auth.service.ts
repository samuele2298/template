import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map } from 'rxjs';
import { User } from './common/model/user';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { HandleError, HttpErrorHandler } from './http-error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject: BehaviorSubject<User | null>;
  public user: Observable<User | null>;
  private handleError: HandleError;
  private httpErrorHandler = inject(HttpErrorHandler);
  private http = inject(HttpClient);
  private router = inject(Router);  

  constructor() {
    // Initialize userSubject with null, since we're using cookies for session
    this.userSubject = new BehaviorSubject<User | null>(null);
    this.handleError = this.httpErrorHandler.createHandleError('AuthService');
    this.user = this.userSubject.asObservable();
    this.status();
  }

  public get userValue() {
    return this.userSubject.value;
  }

  /* login() {
    window.location.href = '/api/auth/google'; 
  } */

  status() {
    return this.http.get<User>('/api/auth/status').pipe(
      map(user => {
        if (Object.keys(user).length === 0) {
          window.location.href = 'https://cryptosonars.com';  // Redirect to marketing or a specific page
        }

        if (user.plan == 'disabled') {//Account scaduto
          window.location.href = 'https://cryptosonars.com';  // Redirect to marketing or a specific page
        }

        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
        //console.log('SONO AUTORIZZATO' + user.email);
        return user;
      }),
      catchError(this.handleError('status', {})),
    );
  }

  isPro() {
    return (this.userValue?.plan === 'pro' ||  this.userValue?.plan === 'elite');
  }

  isAdmin() {
    return this.userValue?.plan === 'admin';
  }

  clearAuth() {
    localStorage.removeItem('user');
    this.userSubject.next(null);
  }

  logout(): Observable<any> {
    return this.http.get('/api/auth/logout', { withCredentials: true }) 
      .pipe(
        catchError(this.handleError('logout', {})),
        map(() => {
          this.clearAuth();
          window.location.href = 'https://cryptosonars.com';  
        })
      );
  }
  
}
