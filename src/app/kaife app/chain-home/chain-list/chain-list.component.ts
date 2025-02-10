import { Component, inject } from '@angular/core';
import { Chain } from '../../common/model/chain';
import { ApiService } from '../../api.service';
import { RouterLink } from '@angular/router';
import { ClrDatagridModule, ClrDatagridSortOrder, ClrInputModule, ClrLoadingButtonModule, ClrLoadingModule, ClrLoadingState, ClrTooltipModule } from '@clr/angular';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-chain-list',
    templateUrl: './chain-list.component.html',
    styleUrls: ['./chain-list.component.css'],
    standalone: true,
    imports: [RouterLink, ClrDatagridModule, FormsModule, ClrInputModule, ClrLoadingButtonModule, ClrLoadingModule, ClrTooltipModule]
})
export class ChainListComponent {
  chains: Chain[] = [];
  chains_filt: Chain[] = [];
  ascSort = ClrDatagridSortOrder.ASC;
  private apiService = inject(ApiService);
  searchFilter: string = '';
  loadingBalState: ClrLoadingState = ClrLoadingState.DEFAULT;

  constructor(
  ) {}

  ngOnInit(): void {
    this.getChainList();
  }

  getChainList(): void {
    this.loadingBalState = ClrLoadingState.LOADING;
    this.apiService.getChainList().subscribe(chains => {
      this.chains = chains as Chain[];
      this.chains_filt = chains as Chain[];
      this.applySearchFilter();
      this.loadingBalState = ClrLoadingState.SUCCESS;
    });
  }

  onEdit(chain: Chain): void {
    console.log(chain);
  }

  onDelete(chain: Chain): void {
    console.log(chain);
  }

  onAdd(): void {
    console.log('new');
  }

  applySearchFilter() {
    this.chains = this.chains_filt.filter(filt => filt.Kchain_desc.toUpperCase().includes(this.searchFilter.toUpperCase()));
  }
}