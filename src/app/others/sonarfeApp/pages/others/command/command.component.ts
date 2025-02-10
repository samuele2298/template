/* import { Component, OnInit, inject } from '@angular/core';
import { ApiService } from '../../api.service';
import { Exchange } from '../../common/model/exchange';
import { FormsModule } from '@angular/forms';
import { ClrAlertModule, ClrLoadingButtonModule, ClrLoadingModule, ClrLoadingState, ClrSelectModule } from '@clr/angular';
import { NgIf, NgFor } from '@angular/common';

@Component({
    selector: 'app-command',
    templateUrl: './command.component.html',
    styleUrls: ['./command.component.css'],
    standalone: true,
    imports: [NgIf, ClrAlertModule, ClrSelectModule, FormsModule, NgFor, ClrLoadingModule, ClrLoadingButtonModule]
})
export class CommandComponent implements OnInit {
  exchanges: Exchange[] = [];
  updateBalanceSelectedExchange: string= '';
  updateBalanceBtnState: ClrLoadingState = ClrLoadingState.DEFAULT;
  sendKaverageBtnState: ClrLoadingState = ClrLoadingState.DEFAULT;
  private apiService = inject(ApiService);

  constructor(
  ) {}

  ngOnInit(): void {
    this.getExchanges();
  }

  getExchanges() {
    this.apiService.getExchangeList().subscribe(exchanges => {
      this.exchanges = exchanges.sort((a, b) => {
        const valA = a.Kexch_name.toUpperCase();
        const valB = b.Kexch_name.toUpperCase();
        if (valA < valB) {
          return -1;
        }
        if (valA > valB) {
          return 1;
        }
        return 0;
      });
    });
  }

  sendUpdateBalanceRequest() {
    this.updateBalanceBtnState = ClrLoadingState.LOADING;
    this.apiService.sendBalanceUpdateRequest(this.updateBalanceSelectedExchange.toString()).subscribe(response => {
      if (response.success) {
        setTimeout(() => {
          this.updateBalanceBtnState = ClrLoadingState.SUCCESS;
        }, 1000);
      }
      else {
        setTimeout(() => {
          this.updateBalanceBtnState = ClrLoadingState.ERROR;
        }, 1000);
      }
    });
  }

  sendKaverageDumpRequest() {
    this.sendKaverageBtnState = ClrLoadingState.LOADING;
    this.apiService.sendKaverageDumpRequest().subscribe(response => {
      if (response.success) {
        setTimeout(() => {
          this.sendKaverageBtnState = ClrLoadingState.SUCCESS;
        }, 1000);
      }
      else {
        setTimeout(() => {
          this.sendKaverageBtnState = ClrLoadingState.ERROR;
        }, 1000);
      }
    });
  }

}
 */