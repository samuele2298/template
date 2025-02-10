import { Injectable, inject } from '@angular/core';
import { HandleError, HttpErrorHandler } from '../../../http-error-handler.service';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs';
import { Balmonitor } from '../../../common/model/balmonitor';
import { Withdraw } from '../../../common/model/coin';
import { Response } from '../../../common/model/response';

@Injectable({
  providedIn: 'root'
})
export class MonitorService {
  private handleError: HandleError;
  private httpErrorHandler = inject(HttpErrorHandler);
  private http = inject(HttpClient);

  constructor(
  ) {
    this.handleError = this.httpErrorHandler.createHandleError('ApiService');
  }
  
  // ********************************************
  // Pair Functions
  // ********************************************
  getBalMonitor() {
    return this.http.get<Balmonitor[]>('/api/monitor/balmonitor')
      .pipe(
        catchError(this.handleError('getBalMonitor', []))
      );
  }

  // ********************************************
  // Withdraw Functions
  // ********************************************
  getWdForSourceAndDest(srcexchid: number, srcsymnum: string) {
    return this.http.get<Withdraw[]>(`/api/withdraw/${srcexchid}/${srcsymnum}`)
      .pipe(
        catchError(this.handleError('getWdForSourceAndDest', []))
      );
  }

  sendWithdraw(data: any) {
    return this.http.post<Response>('/api/withdraw/sendwithdraw', data)
      .pipe(
        catchError(this.handleError('sendWithdraw', {} as Response))
      );
  }

}
