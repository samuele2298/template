import { Injectable, inject } from '@angular/core';
import { HandleError, HttpErrorHandler } from '../../../http-error-handler.service';
import { HttpClient } from '@angular/common/http';
import { PairSymbol } from '../../../common/model/pair-symbol';
import { catchError } from 'rxjs';
import { Pair } from '../../../common/model/pair';
import { Response } from '../../../common/model/response';

@Injectable({
  providedIn: 'root'
})
export class PairService {
  private handleError: HandleError;
  private httpErrorHandler = inject(HttpErrorHandler);
  private http = inject(HttpClient);

  constructor(
  ) {
    this.handleError = this.httpErrorHandler.createHandleError('PairService');
  }

  // ********************************************
  // Pair Functions
  // ********************************************
  getPairList() {
    return this.http.get<PairSymbol[]>('/api/pair')
      .pipe(
        catchError(this.handleError('getPairList', []))
      );
  }

  getPair(id: string) {
    return this.http.get<Pair>(`/api/pair/${id}`)
      .pipe(
        catchError(this.handleError('getPair', {} as Pair))
      );
  }

  setPair(pair: Pair) {
    return this.http.post<Response>('/api/pair', pair)
      .pipe(
        catchError(this.handleError('setPair', {} as Response))
      );
  }

  delPair(id: string) {
    return this.http.delete<Response>(`/api/pair/${id}`)
      .pipe(
        catchError(this.handleError('delPair', {} as Response))
      );
  }
}
