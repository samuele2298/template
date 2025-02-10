import { Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';
import { AuthService } from './auth.service';
import { User } from './common/model/user';

@Injectable({
  providedIn: 'root'
})
export class TabledataService{
  exchangeName = new Map<string, string>();
  symsName = new Map<string, string>();
  private apiService = inject(ApiService);
  private authService = inject(AuthService);
  user?: User | null;
  timeoutInterval: any;

  constructor() {
    this.authService.user.subscribe(x => this.user = x);
  }

  reloadData() {
    if (this.user) {
      this.apiService.getExchangeList().subscribe(exchanges => {
        this.exchangeName.clear();
        for (const exch of exchanges) {
          this.exchangeName.set(exch.id.toString().padStart(3, '0'), exch.Kexch_name);
        }
        this.apiService.getSymbolList().subscribe(syms => {
          this.symsName.clear();
          for (const sym of syms) {
            this.symsName.set(sym.Ksym_number, sym.Ksym_description.split(' ')[0]);
          }
        });
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

  getExchangeName(key: string) {
    return this.exchangeName.get(key);
  }

  getPairName(key: string) {
    return this.symsName.get(key);
  }
}
