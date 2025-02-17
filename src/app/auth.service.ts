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
    this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
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
          window.location.href = '/';  // Redirect to marketing or a specific page
        }

        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
        console.log('SONO AUTORIZZATO' + user.email);
        return user;
      }),
      catchError(this.handleError('status', {})),
    );
  }

  login(email: string, password: string) {
    return this.http.post<any>('/api/auth/login', {email, password})
      .pipe(map(res => {
        localStorage.setItem('user', JSON.stringify(res.user));
        this.userSubject.next(res.user);
        console.log(JSON.stringify(this.userValue));
        return res.user;
      }));                              
  }

  clearAuth() {
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }

  logout() {
    return this.http.get('/api/auth/logout')
      .pipe(
        catchError(this.handleError('logout', {}))
      );
  }
}
