import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { catchError } from 'rxjs';
import { HttpErrorHandler, HandleError } from './http-error-handler.service';
import { SCoin, Coin, CoinRef, LCoin, defaultCoin, FormCoin, GCoin} from './common/model/coin';
import { Tick } from './common/model/chart';
import { Global } from './common/model/global';
import { Bias } from './common/model/bias';
import { Search } from './common/model/search';
import { Category, SCategory, UpdCategory } from './common/model/category';
import { Response } from './common/model/response';
import { AuthService } from './auth.service';
import { User } from './common/model/user';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private handleError: HandleError;
  private httpErrorHandler = inject(HttpErrorHandler);
  private authservice = inject(AuthService);
  private http = inject(HttpClient);

  constructor() {
    this.handleError = this.httpErrorHandler.createHandleError('ApiService');
  }

  // ********************************************
  // Dashboard 
  // ********************************************
  invalidateWeights(){
    return this.http.get<Response>('/api/dashboard/invalidate-weights')
    .pipe(
      catchError(this.handleError('invalidateWeights', {} as Response))
    );
  }

  getGlobalMetrics() {
    return this.http.get<Global[]>('/api/dashboard/global-metrics')
      .pipe(
        catchError(this.handleError('getGlobalMetrics', []))
      );
  }

  getChart() {
    return this.http.get<Tick[]>('/api/dashboard/chart')
      .pipe(
        catchError(this.handleError('getChart', []))
      );
  }

  getBestTrading(weights: any) {
    return this.http.post<SCoin[]>('/api/dashboard/best-trading', weights)
      .pipe(
        catchError(this.handleError('getBestTrading', []))
      );
  }

  getBestInvesting(weights: any) {
    return this.http.post<SCoin[]>(`/api/dashboard/best-investing`, weights)
      .pipe(
        catchError(this.handleError('getBestInvesting', []))
      );
  }

  getBestCategories() {
    return this.http.get<SCategory[]>(`/api/dashboard/best-categories`)
      .pipe(
        catchError(this.handleError('getBestCategories', []))
      );
  }

  // ********************************************
  // Trading
  // ********************************************
  getBias() {
    return this.http.get<Bias[]>('/api/trading/bias')
      .pipe(
        catchError(this.handleError('getBias', []))
      );
  }

  getBest(weights: any) {
    return this.http.post<SCoin[]>('/api/trading/best', weights)
      .pipe(
        catchError(this.handleError('getBest', []))
      );
  }

  getWorst(weights: any) {
    return this.http.post<SCoin[]>('/api/trading/worst',weights)
      .pipe(
        catchError(this.handleError('getWorst', []))
      );
  }

  // ********************************************
  // Category
  // ********************************************
  getCategoryList() {
    return this.http.get<Category[]>('/api/category/list')
      .pipe(
        catchError(this.handleError('getCategoryList', []))
      );
  }

  getCategory(name: string) {
    return this.http.get<{category: Category, coins: LCoin[]}>(`/api/category/${name}`)
      .pipe(
        catchError(this.handleError('getCategory', { category: null, coins: [] }))
      );
  }

  getCategoryCoinsRef(id: number) {
    return this.http.get<CoinRef[]>(`/api/category/other-coins/${id}`)
      .pipe(
        catchError(this.handleError('getCategoryCoinsRef', []))
      );
  }

  addCategory(category: string) {
    return this.http.post<Response>('/api/category/add', {category})
      .pipe(
        catchError(this.handleError('addCategory', {} as Response))
      );
  }

  duplicateCategory(category: number, name : string) {
    return this.http.post<Response>('/api/category/duplicate', {category, name })
      .pipe(
        catchError(this.handleError('duplicateCategory', {} as Response))
      );
  }

  renameCategory(category: number, name : string) {
    return this.http.post<Response>('/api/category/rename', {category, name })
      .pipe(
        catchError(this.handleError('renameCategory', {} as Response))
      );
  }

  delCategory(category: number) {
    return this.http.delete<Response>(`/api/category/${category}`)
      .pipe(
        catchError(this.handleError('delCategory', {} as Response))
      );
  }


  clearCategory(category: number) {
    return this.http.get<Response>(`/api/category/clear/${category}`)
      .pipe(
        catchError(this.handleError('clearCategory', {} as Response))
      );
  }

  addCoinCategory(category: number, coins: number[]) {
    return this.http.post<Response>('/api/category/add-coins', {category, coins})
      .pipe(
        catchError(this.handleError('addCoinCategory', {} as Response))
      );
  }

  removeCoinCategory(category: number, coinId: number) {
    return this.http.post<Response>('/api/category/remove-coin', {category, coinId})
      .pipe(
        catchError(this.handleError('removeCoinCategory', {} as Response))
      );
  }

  // ********************************************
  // Gems
  // ********************************************
  getGemList() {
    return this.http.get<GCoin[]>('/api/gems',)
      .pipe(
        catchError(this.handleError('getGemList', []))
      );
  }

  // ********************************************
  // Coin
  // ********************************************
  addCoin(coin: FormCoin) {
    return this.http.post<Response>('/api/coin/add', {coin})
      .pipe(
        catchError(this.handleError('addCoin', {} as Response))
      );
  }

  getCoinList() {
    return this.http.get<LCoin[]>('/api/coin/list')
      .pipe(
        catchError(this.handleError('getCoinList', []))
      );
  }

  getCoin(name: string) {
    return this.http.get<Coin>(`/api/coin/${name}`)
      .pipe(
        catchError(this.handleError('getCoin', defaultCoin))
      );
  }

  getCoinCategories(name: string) {
    return this.http.get<Category[]>(`/api/coin/categories/${name}`)
      .pipe(
        catchError(this.handleError('getCoin', []))
      );
  }

  // ********************************************
  // Search
  // ********************************************
  getSearch() {
    return this.http.get<Search[]>('/api/search')
      .pipe(
        catchError(this.handleError('getSearch', []))
      );
  }


  // ********************************************
  // User
  // ********************************************
  getUsers() {
    return this.http.get<User[]>('/api/user/list')
      .pipe(
        catchError(this.handleError('getUsers', []))
      );
  }

  addUser(email: string) {
    return this.http.get<Response>(`/api/user/add/${email}`)
      .pipe(
        catchError(this.handleError('addUser', {} as Response))
      );
  }

  delUser(id: number) {
    return this.http.delete<Response>(`/api/user/${id}`)
      .pipe(
        catchError(this.handleError('delUser', {} as Response))
      );
  }

  changePlan(id: number, plan: string) {
    return this.http.get<Response>(`/api/user/plan/${id}/${plan}`)
      .pipe(
        catchError(this.handleError('changePlan', {} as Response))
      );
  }
}
