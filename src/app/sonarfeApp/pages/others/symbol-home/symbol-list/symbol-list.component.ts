/* import { Component, inject } from '@angular/core';
import { Symbol } from '../../../common/model/symbol';
import { ApiService } from '../../../api.service';
import { RouterLink } from '@angular/router';
import { ClrDatagridModule, ClrDatagridSortOrder, ClrInputModule, ClrLoadingButtonModule, ClrLoadingModule, ClrLoadingState, ClrTooltipModule } from '@clr/angular';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-symbol-list',
    templateUrl: './symbol-list.component.html',
    styleUrls: ['./symbol-list.component.css'],
    standalone: true,
    imports: [RouterLink, ClrDatagridModule, FormsModule, ClrInputModule, ClrLoadingButtonModule, ClrLoadingModule, ClrTooltipModule, NgIf]
})
export class SymbolListComponent {
  symbols: Symbol[] = [];
  symbols_filt: Symbol[] = [];
  ascSort = ClrDatagridSortOrder.ASC;
  private apiService = inject(ApiService);
  searchFilter: string = '';
  loadingBalState: ClrLoadingState = ClrLoadingState.DEFAULT;

  constructor(
  ) {}

  ngOnInit(): void {
    this.getSymbolList();
  }

  getSymbolList(): void {
    this.loadingBalState = ClrLoadingState.LOADING;
    this.apiService.getSymbolList().subscribe(symbols => {
      this.symbols = symbols;
      this.symbols_filt = symbols;
      this.applySearchFilter();
      this.loadingBalState = ClrLoadingState.SUCCESS;
    });
  }

  onEdit(symbol: Symbol): void {
    console.log(symbol);
  }

  onDelete(symbol: Symbol): void {
    console.log(symbol);
  }

  onAdd(): void {
    console.log('new');
  }

  applySearchFilter() {
    this.symbols = this.symbols_filt.filter(filt => filt.Ksym_description.toUpperCase().includes(this.searchFilter.toUpperCase()) || filt.Ksym_number.includes(this.searchFilter.toUpperCase()));
  }
}
 */