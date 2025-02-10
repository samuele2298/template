import { Component, OnInit, inject } from '@angular/core';
import { PairSymbol, statusTradingMap } from '../../common/model/pair-symbol';
import { RouterLink } from '@angular/router';
import { ClrCheckboxModule, ClrDatagridModule, ClrDatagridSortOrder, ClrInputModule, ClrLoadingButtonModule, ClrLoadingModule, ClrLoadingState, ClrTooltipModule, ClrComboboxModule } from '@clr/angular';
import { PairService } from '../pair.service';
import { Pair } from '../../common/model/pair';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { TabledataService } from '../../tabledata.service';

@Component({
    selector: 'app-pair-list',
    templateUrl: './pair-list.component.html',
    styleUrls: ['./pair-list.component.css'],
    standalone: true,
    imports: [RouterLink, ClrDatagridModule, ClrCheckboxModule, FormsModule, ClrInputModule, ClrLoadingButtonModule, ClrLoadingModule, ClrTooltipModule, NgIf, ClrComboboxModule]
})
export class PairListComponent implements OnInit {
  private tableDataService = inject(TabledataService);
  pairs: PairSymbol[] = [];
  ascSort = ClrDatagridSortOrder.ASC;
  private pairService = inject(PairService);
  statusTradingMap = statusTradingMap;
  loadingBalState: ClrLoadingState = ClrLoadingState.DEFAULT;
  searchFilter: string = '';
  pairs_filt: PairSymbol[] = [];
  coins: string[] = [];

  //Coin Filters
  sym1selection: string = '';
  sym2selection: string = '';

  constructor() {
  }

  ngOnInit(): void {
    this.getPairList();
  }

  getPairList(): void {
    this.loadingBalState = ClrLoadingState.LOADING;
    this.pairService.getPairList().subscribe(pairs => {
      this.pairs = pairs;
      this.pairs_filt = pairs;
      this.applySearchFilter();
      this.getCoins();
      this.loadingBalState = ClrLoadingState.SUCCESS;
    });
  }

  getCoins() {
    setTimeout(() => { //DELAY FOR THE LIST OF THE COIN
      this.coins = Array.from(this.tableDataService.symsName.values());
      this.coins = this.coins.map(desc => desc.split(' ')[0]);
      this.coins.sort((a, b) => a.localeCompare(b));
      this.coins.unshift('ALL');
      console.log(this.coins);
    }, 500);  
  }

  applySearchFilter() {
    this.pairs = this.pairs_filt.filter(filt => 
      (
        filt.exch_name.toUpperCase().includes(this.searchFilter.toUpperCase()) || 
        filt.sym1_desc.toUpperCase().includes(this.searchFilter.toUpperCase())
      ) &&
      filt.sym1_desc.toUpperCase().includes(this.sym1selection != 'ALL'? this.sym1selection.toUpperCase() : '') &&
      filt.sym2_desc.toUpperCase().includes(this.sym2selection != 'ALL'? this.sym2selection.toUpperCase() : '')  
    );
  }

  onDelete(pair: PairSymbol) {
    console.log(pair);
  }

  onChangeWatch(control: any, id: number) {
    const watch = control.currentTarget.checked ? 1 : 0;
    const pair = {
      id: id,
      Kpair_watch: watch
    } as Pair;
    this.pairService.setPair(pair).subscribe(response => {
      //
    });
  }
}
