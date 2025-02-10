/* import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../../api.service';
import { TabledataService } from '../../../tabledata.service';
import { Symref } from '../../../common/model/symref';
import { ClrDatagridModule, ClrDatagridSortOrder, ClrInputModule, ClrLoadingButtonModule, ClrLoadingModule, ClrLoadingState } from '@clr/angular';

@Component({
    selector: 'app-symref-list',
    templateUrl: './symref-list.component.html',
    styleUrls: ['./symref-list.component.css'],
    standalone: true,
    imports: [RouterLink, FormsModule, ClrInputModule, ClrDatagridModule, ClrLoadingButtonModule, ClrLoadingModule]
})
export class SymrefListComponent implements OnInit {
  symrefs: Symref[] = [];
  symrefs_filt: Symref[] = [];
  ascSort = ClrDatagridSortOrder.ASC;
  searchFilter: string = '';
  private apiService = inject(ApiService);
  private tableDataService = inject(TabledataService);
  loadingBalState: ClrLoadingState = ClrLoadingState.DEFAULT;

  constructor(
  ) {}
  
  ngOnInit(): void {
    this.getSymrefList();
  }

  getSymrefList() {
    this.loadingBalState = ClrLoadingState.LOADING;
    this.apiService.getSymrefList().subscribe(symrefs => {
      this.symrefs_filt = symrefs;
      this.symrefs = symrefs;
      this.applySearchFilter();
      this.loadingBalState = ClrLoadingState.SUCCESS;
    });
  }

  getExchangeName(key: string) {
    return this.tableDataService.getExchangeName(key);
  }

  onDelete(symref: Symref): void {
    console.log(symref);
  }

  applySearchFilter() {
    //this.bals = this.balances.filter(bal => bal.Kbal_value > 0 && (bal.Kexch_name.toUpperCase().includes(this.searchFilter.toUpperCase()) || bal.Ksym_description.toUpperCase().includes(this.searchFilter.toUpperCase())));
    this.symrefs = this.symrefs_filt.filter(filt => filt.Ksymref_name.toUpperCase().includes(this.searchFilter.toUpperCase()) || filt.Ksymref_Ksym_number.includes(this.searchFilter.toUpperCase()) || this.getExchangeName(filt.Ksymref_Kexch_id.toString().padStart(3, '0'))?.toUpperCase().includes(this.searchFilter.toUpperCase()));
  }
}
 */