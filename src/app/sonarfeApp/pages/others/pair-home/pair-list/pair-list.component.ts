import { Component, OnInit, inject } from '@angular/core';
import { PairSymbol, statusTradingMap } from '../../../../common/model/pair-symbol';
import { RouterLink } from '@angular/router';
import { ClrCheckboxModule, ClrDatagridModule, ClrDatagridSortOrder, ClrInputModule, ClrLoadingButtonModule, ClrLoadingModule, ClrLoadingState, ClrTooltipModule } from '@clr/angular';
import { PairService } from '../pair.service';
import { Pair } from '../../../../common/model/pair';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-pair-list',
    templateUrl: './pair-list.component.html',
    styleUrls: ['./pair-list.component.css'],
    standalone: true,
    imports: [RouterLink, ClrDatagridModule, ClrCheckboxModule, FormsModule, ClrInputModule, ClrLoadingButtonModule, ClrLoadingModule, ClrTooltipModule, NgIf]
})
export class PairListComponent implements OnInit {
  pairs: PairSymbol[] = [];
  ascSort = ClrDatagridSortOrder.ASC;
  private pairService = inject(PairService);
  statusTradingMap = statusTradingMap;
  loadingBalState: ClrLoadingState = ClrLoadingState.DEFAULT;
  searchFilter: string = '';
  pairs_filt: PairSymbol[] = [];

  constructor(
  ) {}

  ngOnInit(): void {
    this.getPairList();
  }

  getPairList(): void {
    this.loadingBalState = ClrLoadingState.LOADING;
    this.pairService.getPairList().subscribe(pairs => {
      this.pairs = pairs;
      this.pairs_filt = pairs;
      this.applySearchFilter();
      this.loadingBalState = ClrLoadingState.SUCCESS;
    });
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

  applySearchFilter() {
    this.pairs = this.pairs_filt.filter(filt => filt.exch_name.toUpperCase().includes(this.searchFilter.toUpperCase()) || filt.sym1_desc.includes(this.searchFilter.toUpperCase()) || filt.sym2_desc.includes(this.searchFilter.toUpperCase()));
  }
}
