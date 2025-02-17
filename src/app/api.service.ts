import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { catchError } from 'rxjs';
import { HttpErrorHandler, HandleError } from './http-error-handler.service';
import { Symbol } from './common/model/symbol';
import { Exchange } from './common/model/exchange';
import { Balance } from './common/model/balance';
import { Response } from './common/model/response';
import { Symref } from './common/model/symref';
import { Opportunity } from './common/model/opportunity';
import { SymrefPair } from './common/model/symrefpair';
import { Setting } from './common/model/setting';
import { Oporder } from './common/model/oporder';
import { Withdrawinprogress, Withdrawlist } from './common/model/withdrawlist';
import { Statistic } from './common/model/statistic';
import { Chain } from './common/model/chain';
import { Chainref } from './common/model/chainref';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private handleError: HandleError;
  private httpErrorHandler = inject(HttpErrorHandler);
  private http = inject(HttpClient);

  constructor(
  ) {
    this.handleError = this.httpErrorHandler.createHandleError('ApiService');
  }


  // ********************************************
  // Test Functions
  // ********************************************
  getTest() {
    return this.http.get<{ message: string }>('/api/dashboard')
      .pipe(
        catchError(this.handleError('getTest', { message: 'Error' }))
      );
  }

  // ********************************************
  // CRUD Functions
  // ********************************************
  getObjectList() {
    return this.http.get<Symbol[]>('/api/object')
      .pipe(
        catchError(this.handleError('getObjectList', []))
      );
  }

  getObject(id: string) {
    return this.http.get<Symbol>(`/api/object/${id}`)
      .pipe(
        catchError(this.handleError('getObject', {} as Symbol))
      );
  }

  getObjectMaxNumber() {
    return this.http.get<any>('/api/object/maxnumber')
      .pipe(
        catchError(this.handleError('getObjectMaxNumber', null))
      );
  }

  setObject(symb: Symbol) {
    return this.http.post<Response>('/api/object', symb)
      .pipe(
        catchError(this.handleError('setObject', {} as Response))
      );
  }

  delObject(id: string) {
    return this.http.delete<Response>(`/api/object/${id}`)
      .pipe(
        catchError(this.handleError('delObject', {} as Response))
      );
  }


  ///////////////////////////////////////////////////////

  // ********************************************
  // Symref Functions
  // ********************************************
  getSymrefList() {
    return this.http.get<Symref[]>('/api/symref')
      .pipe(
        catchError(this.handleError('getSymrefList', []))
      );
  }

  getSymRefListByExch(id: string) {
    return this.http.get<SymrefPair[]>('/api/symref/byexch/' + id)
      .pipe(
        catchError(this.handleError('getSymRefListByExch', []))
      );
  }

  getSymref(id: string) {
    return this.http.get<Symref>(`/api/symref/${id}`)
      .pipe(
        catchError(this.handleError('getSymref', {} as Symref))
      );
  }

  setSymref(symref: Symref) {
    return this.http.post<Response>('/api/symref', symref)
      .pipe(
        catchError(this.handleError('setSymref', {} as Response))
      );
  }

  delSymref(id: string) {
    return this.http.delete<Response>(`/api/symref/${id}`)
      .pipe(
        catchError(this.handleError('delSymref', {} as Response))
      );
  }

   // ********************************************
  // Chain Functions
  // ********************************************
  getChainList() {
    return this.http.get<Chain[]>('/api/chain')
      .pipe(
        catchError(this.handleError('getChainList', []))
      );
  }

  getChain(id: string) {
    return this.http.get<Chain>(`/api/chain/${id}`)
      .pipe(
        catchError(this.handleError('getChain', {} as Chain))
      );
  }

  setChain(chain: Chain) {
    return this.http.post<Response>('/api/chain', chain)
      .pipe(
        catchError(this.handleError('setChain', {} as Response))
      );
  }

  delChain(id: string) {
    return this.http.delete<Response>(`/api/chain/${id}`)
      .pipe(
        catchError(this.handleError('delChain', {} as Response))
      );
  }

  // ********************************************
  // Chainref Functions
  // ********************************************
  getChainrefList() {
    return this.http.get<Chainref[]>('/api/chainref')
      .pipe(
        catchError(this.handleError('getChainrefList', []))
      );
  }

  getChainref(id: string) {
    return this.http.get<Chainref>(`/api/chainref/${id}`)
      .pipe(
        catchError(this.handleError('getChainref', {} as Chainref))
      );
  }

  setChainref(chainref: Chainref) {
    return this.http.post<Response>('/api/chainref', chainref)
      .pipe(
        catchError(this.handleError('setChainref', {} as Response))
      );
  }

  delChainrefid(id: string) {
    return this.http.delete<Response>(`/api/chainref/${id}`)
      .pipe(
        catchError(this.handleError('delChainrefid', {} as Response))
      );
  }

  // ********************************************
  // Exchange Functions
  // ********************************************
  getExchangeList() {
    return this.http.get<Exchange[]>('/api/exchange')
      .pipe(
        catchError(this.handleError('getExchangeList', []))
      );
  }

  getExchange(id: string) {
    return this.http.get<Exchange>(`/api/exchange/${id}`)
      .pipe(
        catchError(this.handleError('getExchange', {} as Exchange))
      );
  }

  setExchange(exch: Exchange) {
    return this.http.post<Response>('/api/exchange', exch)
      .pipe(
        catchError(this.handleError('setExchange', {} as Response))
      );
  }

  delExchange(id: string) {
    return this.http.delete<Response>(`/api/exchange/${id}`)
      .pipe(
        catchError(this.handleError('delExchange', {} as Response))
      );
  }

  // ********************************************
  // Balance Functions
  // ********************************************
  getBalList() {
    return this.http.get<Balance[]>('/api/balance')
      .pipe(
        catchError(this.handleError('getBalList', []))
      );
  }

  // ********************************************
  // Opp Functions
  // ********************************************
  getOpportsAndOrders() {
    return this.http.get<Opportunity[]>('/api/opportunity')
      .pipe(
        catchError(this.handleError('getOpportsAndOrders', []))
      );
  }

  cancelOrder(ord: Oporder) {
    return this.http.post<Response>('/api/opportunity/cancelorder', ord)
      .pipe(
        catchError(this.handleError('cancelOrder', {} as Response))
      );
  }

  // ********************************************
  // OppHistory Functions
  // ********************************************
  getHistory(data: any) {
    return this.http.post<Opportunity[]>('/api/history', data)
      .pipe(
        catchError(this.handleError('getHistory', []))
      );
  }

  // ********************************************
  // Command Functions
  // ********************************************
  sendBalanceUpdateRequest(exchid: string) {
    return this.http.post<Response>('/api/command/sendBalanceUpdateRequest', { exchid: exchid })
      .pipe(
        catchError(this.handleError('sendBalanceUpdateRequest', {} as Response))
      );
  }

  sendKaverageDumpRequest() {
    return this.http.post<Response>('/api/command/sendKaverageDumpRequest', null)
      .pipe(
        catchError(this.handleError('sendBalanceUpdateRequest', {} as Response))
      );
  }

  getTradingEnabled() {
    return this.http.get<any>('/api/command/gettradingenabled')
      .pipe(
        catchError(this.handleError('getTradingEnabled', {}))
      );
  }

  setTradingEnabled() {
    return this.http.get<any>('/api/command/settradingenabled')
      .pipe(
        catchError(this.handleError('setTradingEnabled', {}))
      );
  }

  setTradingDisabled() {
    return this.http.get<any>('/api/command/settradingdisabled')
      .pipe(
        catchError(this.handleError('setTradingDisabled', {}))
      );
  }

  getWithdrawEnabled() {
    return this.http.get<any>('/api/command/getwithdrawenabled')
      .pipe(
        catchError(this.handleError('getWithdrawEnabled', {}))
      );
  }

  setWithdrawEnabled() {
    return this.http.get<any>('/api/command/setwithdrawenabled')
      .pipe(
        catchError(this.handleError('setWithdrawEnabled', {}))
      );
  }

  setWithdrawDisabled() {
    return this.http.get<any>('/api/command/setwithdrawdisabled')
      .pipe(
        catchError(this.handleError('setWithdrawDisabled', {}))
      );
  }

  clearUrgentLogs() {
    return this.http.get<any>('/api/command/clearurgentlogs')
      .pipe(
        catchError(this.handleError('clearurgentlogs', {}))
      );
  }

  // ********************************************
  // Settings Functions
  // ********************************************
  getSettingList() {
    return this.http.get<Setting[]>('/api/setting')
      .pipe(
        catchError(this.handleError('getSettingList', []))
      );
  }

  setSetting(setting: Setting) {
    return this.http.post<Response>('/api/setting', setting)
      .pipe(
        catchError(this.handleError('setSetting', {} as Response))
      );
  }

  // ********************************************
  // Logs Functions
  // ********************************************
  getLogs() {
    return this.http.get<any>('/api/logs')
      .pipe(
        catchError(this.handleError('getLogs', {}))
      );
  }
  // ********************************************
  // Withdrawals Functions
  // ********************************************
  getWithdrawals(status : number, filter : string) {
    return this.http.post<Withdrawlist[]>('/api/withdraw/list/', {status: status, filter: filter })
      .pipe(
        catchError(this.handleError('getWithdrawals', []))
      );
  }

  delWithdraw(id : string) {
    return this.http.delete<Response>(`/api/withdraw/${id}`)
      .pipe(
        catchError(this.handleError('delWithdraw', {} as Response))
      );
  }

  getWithdrawalsInprogress() {
    return this.http.get<Withdrawinprogress[]>('/api/withdraw/get-in-progress')
      .pipe(
        catchError(this.handleError('getWithdrawalsInprogress', []))
      );
  }

   // ********************************************
  // Statistics Functions
  // ********************************************
  getStatistics() {
    return this.http.get<Statistic[]>('/api/statistics/list')
      .pipe(
        catchError(this.handleError('getStatistics', []))
      );
  }
  getAccountValue() {
    return this.http.get<any>('/api/statistics/accountValue')
      .pipe(
        catchError(this.handleError('getAccountValue', {}))
      );
  }
}
