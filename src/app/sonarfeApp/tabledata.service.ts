import { Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';
import { AuthService } from './auth.service';
import { User } from './common/model/user';
import { Category, getSafeCategoryList } from './common/model/category';

@Injectable({
  providedIn: 'root'
})
export class TabledataService{
  private apiService = inject(ApiService);
  private authService = inject(AuthService);

  categories: Category[] = [];
  user?: User | null;
  timeoutInterval: any;

  constructor() {
    this.authService.user.subscribe(x => this.user = x);
  }

  reloadData() {
    if (this.user) {
      this.apiService.getCategoryList().subscribe(categories => {
        this.categories = getSafeCategoryList(categories);
      });
      setTimeout(this.reloadData.bind(this), 60000);
    }
    else {
      setTimeout(this.reloadData.bind(this), 1000)
    }
  } 

  startTableData() {
    this.reloadData();
  }
 
  getCategories() {
    return this.categories;
  }

  setWeights(str: any) {
    localStorage.setItem('weights', JSON.stringify(str));
    this.apiService.invalidateWeights().subscribe(Response => {});
  }
 
  getWeights() {
    const weights: any = localStorage.getItem('weights');
    if (weights) {
      const parsedWeights = JSON.parse(weights);
      return {
        price: (parsedWeights.price === undefined || parsedWeights.price === null) ? 33.33 : parsedWeights.price,
        volu: (parsedWeights.volu === undefined || parsedWeights.volu === null) ? 33.33 : parsedWeights.volu,
        vol: (parsedWeights.vol === undefined || parsedWeights.vol === null) ? 33.33 : parsedWeights.vol,
      };
    }
    return {
      price: 33.33,
      volu: 33.33,
      vol: 33.33,
    };
  }
}
