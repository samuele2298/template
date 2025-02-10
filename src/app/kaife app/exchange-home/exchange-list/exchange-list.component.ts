import { Component, inject } from '@angular/core';
import { Exchange } from '../../common/model/exchange';
import { ApiService } from '../../api.service';
import { RouterLink } from '@angular/router';
import { ClrCheckboxModule, ClrDatagridModule, ClrDatagridSortOrder } from '@clr/angular';

@Component({
    selector: 'app-exchange-list',
    templateUrl: './exchange-list.component.html',
    styleUrls: ['./exchange-list.component.css'],
    standalone: true,
    imports: [RouterLink, ClrDatagridModule, ClrCheckboxModule]
})
export class ExchangeListComponent {
  exchanges: Exchange[] = [];
  exchange: Exchange = {} as Exchange;
  ascSort = ClrDatagridSortOrder.ASC;
  private apiService = inject(ApiService);

  constructor(
  ) {}

  ngOnInit(): void {
    this.getExchangeList();
  }

  getExchangeList(): void {
    this.apiService.getExchangeList().subscribe(exchanges => (this.exchanges = exchanges));
  }

  onDelete(exchange: Exchange): void {
    console.log(exchange);
  }

  onChangeWatch(control: any, id: number) {
    const watch = control.currentTarget.checked ? 1 : 0;
    const exch = {
      id: id,
      Kexch_watch: watch
    } as Exchange;
    this.apiService.setExchange(exch).subscribe(response => {
      //
    });
  }

}
