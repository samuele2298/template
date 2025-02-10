/* import { Component, OnInit, inject } from '@angular/core';
import { Balance } from '../common/model/balance';
import { ApiService } from '../api.service';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClrCheckboxModule, ClrDatagridModule, ClrInputModule, ClrLoadingButtonModule, ClrLoadingModule, ClrLoadingState } from '@clr/angular';

@Component({
    selector: 'app-balance-list',
    templateUrl: './balance-list.component.html',
    styleUrls: ['./balance-list.component.css'],
    standalone: true,
    imports: [ClrCheckboxModule, ClrDatagridModule, DatePipe, FormsModule, ClrInputModule, ClrLoadingModule, ClrLoadingButtonModule]
})
export class BalanceListComponent implements OnInit {
  bals: Balance[] = [];
  searchFilter: string = '';
  balances: Balance[] = [];
  checkedZeroBalance: boolean = false;
  private apiService = inject(ApiService);
  loadingBalState: ClrLoadingState = ClrLoadingState.DEFAULT;

  constructor(
  ) {}

  ngOnInit(): void {
    this.getBalList();
  }

  getBalList(): void {
    this.loadingBalState = ClrLoadingState.LOADING;
    this.apiService.getBalList().subscribe(bals => {
      this.balances = bals;
      this.bals = bals;
      this.applySearchFilter();
      this.loadingBalState = ClrLoadingState.SUCCESS;
    });
  }

  applySearchFilter() {
    if (this.checkedZeroBalance) {
      this.bals = this.balances.filter(bal => bal.Kbal_value > 0 && (bal.Kexch_name.toUpperCase().includes(this.searchFilter.toUpperCase()) || bal.Ksym_description.toUpperCase().includes(this.searchFilter.toUpperCase())));
    }
    else {
      this.bals = this.balances.filter(bal => bal.Kexch_name.toUpperCase().includes(this.searchFilter.toUpperCase()) || bal.Ksym_description.toUpperCase().includes(this.searchFilter.toUpperCase()));
    }
  }

  applyBalanceZeroFilter() {
    if (this.checkedZeroBalance) {
      this.bals = this.balances.filter(bal => bal.Kbal_value > 0);
    }
    else {
      this.bals = this.balances;
    }
  }

}
 */