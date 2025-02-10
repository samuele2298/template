import { Injectable, inject } from '@angular/core';
import { HandleError, HttpErrorHandler } from '../http-error-handler.service';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs';
import { Balmonitor, ExchDataPrice, ExchStatus, MissingWdRecord } from '../common/model/balmonitor';
import { Withdraw } from '../common/model/withdraw';
import { Response } from '../common/model/response';

@Injectable({
  providedIn: 'root'
})
export class MonitorService {
  private handleError: HandleError;
  private httpErrorHandler = inject(HttpErrorHandler);
  private http = inject(HttpClient);
  private volKey = 'volume'; // Chiave per il cookie storage
  private defaultVolume: number = 0.5; // Volume di default

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

  getExchDataPrice() {
    return this.http.get<ExchDataPrice>('/api/monitor/exchdataprice')
      .pipe(
        catchError(this.handleError('getExchDataPrice', []))
      );
  }

  getExchStatus() {
    return this.http.get<ExchStatus[]>('/api/monitor/exchstatus')
      .pipe(
        catchError(this.handleError('getExchStatus', []))
      );
  }

  getMissingWdRecords() {
    return this.http.get<MissingWdRecord>('/api/monitor/getmissingrecords')
      .pipe(
        catchError(this.handleError('getMissingWdRecords', []))
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

  // ********************************************
  // Volume Functions
  // *******************************************
  setVolume(vol: number) {
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    document.cookie = `${this.volKey}=${vol};expires=${expires.toUTCString()};path=/`;
  }

  getVolume(): number {
    const cookies = document.cookie.split(';');
    const volCookie = cookies.find(cookie => cookie.trim().startsWith(this.volKey));
    if (volCookie) {
      const volValue = volCookie.split('=')[1];
      return parseFloat(volValue);
    }
    return this.defaultVolume; 
  }

}
