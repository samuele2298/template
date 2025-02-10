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
  }

  public get userValue() {
    return this.userSubject.value;
  }

  login(email: string, password: string) {
    return this.http.post<User>('/api/auth/login', {email, password})
      .pipe(map(user => {
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
        return user;
      })); 
      /* const user = {id: 1, email: 'Sam'};
      this.userSubject.next(user);
      return user; */
  }

  clearAuth() {
    //localStorage.removeItem('user');
    //this.userSubject.next(null);
    //this.router.navigate(['/login']);
  }

  logout() {
    //return this.http.post('/api/auth/logout', null)
    //  .pipe(
    //    catchError(this.handleError('logout', {}))
    //  );

    // localStorage.removeItem('user');
    // this.userSubject.next(null);
    // this.router.navigate(['/login']);
  }
}
