/* import { Component, OnInit, inject } from '@angular/core';
import { ApiService } from '../../api.service';
import { RouterLink } from '@angular/router';
import { ClrDatagridModule, ClrDatagridSortOrder, ClrInputModule, ClrLoadingButtonModule, ClrLoadingModule, ClrLoadingState, ClrTooltipModule } from '@clr/angular';
import { FormsModule } from '@angular/forms';
import { TabledataService } from '../../tabledata.service';
import { Chainref } from '../../common/model/chainref';

@Component({
    selector: 'app-chainref-list',
    templateUrl: './chainref-list.component.html',
    styleUrls: ['./chainref-list.component.css'],
    standalone: true,
    imports: [RouterLink, ClrDatagridModule, FormsModule, ClrInputModule, ClrLoadingButtonModule, ClrLoadingModule, ClrTooltipModule]
})
export class ChainrefListComponent implements OnInit {
  chainrefs: Chainref[] = [];
  chainrefs_filt: Chainref[] = [];
  ascSort = ClrDatagridSortOrder.ASC;
  searchFilter: string = '';
  private apiService = inject(ApiService);
  private tableDataService = inject(TabledataService);
  loadingBalState: ClrLoadingState = ClrLoadingState.DEFAULT;

  constructor(
  ) {}

  ngOnInit(): void {
    this.getChainrefList();
  }

  getChainrefList(): void {
    this.loadingBalState = ClrLoadingState.LOADING;
    this.apiService.getChainrefList().subscribe(chains => {
      this.chainrefs_filt = chains;
      this.chainrefs = chains;
      this.applySearchFilter();
      this.loadingBalState = ClrLoadingState.SUCCESS;
    });
  }

  getExchangeName(key: string) {
    return this.tableDataService.getExchangeName(key);
  }

  onDelete(chainref: Chainref): void {
    console.log(chainref);
  }

  applySearchFilter() {
    this.chainrefs = this.chainrefs_filt.filter(filt => 
      filt.Kchainref_name.toUpperCase().includes(this.searchFilter.toUpperCase()) || 
      filt.Kchain_desc.toUpperCase().includes(this.searchFilter.toUpperCase()) || 
      filt.Kchainref_Kchain_id.toString().includes(this.searchFilter.toUpperCase()) || 
      this.getExchangeName(filt.Kchainref_Kexch_id.toString().padStart(3, '0'))?.toUpperCase().includes(this.searchFilter.toUpperCase())
    );
  }
} */