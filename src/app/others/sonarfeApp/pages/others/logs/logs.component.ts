/* import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ClrDatagridModule, ClrDatagridSortOrder, ClrModalModule } from '@clr/angular';
import { ApiService } from '../../api.service';
import { WebsocketService } from '../../websocket.service';
import { Subject, filter, takeUntil } from 'rxjs';

@Component({
    selector: 'app-logs',
    templateUrl: './logs.component.html',
    styleUrls: ['./logs.component.css'],
    standalone: true,
    imports: [ClrModalModule, ClrDatagridModule, DatePipe]
})
export class LogsComponent implements OnInit, OnDestroy {
  descSort = ClrDatagridSortOrder.DESC;
  stop$ = new Subject<void>();
  urgent_messages: any[] = [];
  notrading_messages: any[] = [];
  pairfound_messages: any[] = [];
  balance_messages: any[] = [];
  withdrawal_messages: any[] = [];
  isModalOpen: boolean = false;
  modalTitle:string = '';
  modalBody:string = '';
  private apiService = inject(ApiService);
  private websocketService = inject(WebsocketService);


  constructor(
  ) {
  }

  ngOnInit(): void {
    this.loadLastLogs();
  }

  loadLastLogs(): void {
    this.apiService.getLogs().subscribe(logs => {
      if (Object.keys(logs).length <= 0) {
        return;
      }
      for (const log of logs.urgent) {
        this.urgent_messages.push(JSON.parse(log));
      }
      for (const log of logs.notradingenabled) {
        this.notrading_messages.push(JSON.parse(log));
      }
      for (const log of logs.pairfound) {
        this.pairfound_messages.push(JSON.parse(log));
      }
      for (const log of logs.balance) {
        this.balance_messages.push(JSON.parse(log));
      }
      for (const log of logs.withdrawal) {
        this.withdrawal_messages.push(JSON.parse(log));
      }
      this.listenWebsocketMess();
    });
  }

  viewData(data: any) {
    this.modalTitle = data.message;
    this.modalBody = JSON.stringify(data.data);
    this.isModalOpen = true;
  }

  ngOnDestroy(): void {
    this.stopFunc();
  }

  stopFunc() {
    this.stop$.next();
    this.stop$.unsubscribe();
  }

  listenWebsocketMess() {
    const message$ = this.websocketService.messageReceived.pipe(
      filter((mess) => mess.action === 'logs'),
      takeUntil(this.stop$)
    );
    message$.subscribe((message: any) => {
      if (message.type === 'notradingenabled') {
        this.notrading_messages.unshift(message);
        if (this.notrading_messages.length > 200) {
          this.notrading_messages.pop();
        }
      }
      else if (message.type === 'pairfound') {
        this.pairfound_messages.unshift(message);
        if (this.pairfound_messages.length > 100) {
          this.pairfound_messages.pop();
        }
      }
      else if (message.type === 'balance') {
        this.balance_messages.unshift(message);
        if (this.balance_messages.length > 200) {
          this.balance_messages.pop();
        }
      }
      else if (message.type === 'withdrawal') {
        this.withdrawal_messages.unshift(message);
        if (this.withdrawal_messages.length > 100) {
          this.withdrawal_messages.pop();
        }
      }
    });
  };  
}
 */