/* import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ClrDatagridModule, ClrDatagridSortOrder, ClrModalModule } from '@clr/angular';
import { ApiService } from '../api.service';
import { WebsocketService } from '../websocket.service';
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
  withdrawal_filtered_messages: any[] = [];
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
      this.withdrawal_filtered_messages = this.withdrawal_messages;
      this.listenWebsocketMess();
      this.filterForBatch(1);
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

  parseLog(log: string): { result?: string; coin?: string; source?: string; dest?: string; chain?: string; status?: string } {
    try {
        const parsedLog = JSON.parse(log);
        return {
            result: parsedLog.result,
            coin: parsedLog.coin,
            source: parsedLog.source,
            dest: parsedLog.dest,
            chain: parsedLog.chain,
            status: parsedLog.status
        };
    } catch (error) {
        console.error("Invalid JSON string:", error);
        return {};
    }
  }

  parseUrgentLog(log: string): { sw?: string; error?: string; } {
    try {
        const parsedLog = JSON.parse(log);
        return {
            sw: parsedLog.sw,
            error: parsedLog.error,
        };
    } catch (error) {
        console.error("Invalid JSON string:", error);
        return {};
    }
  }

  filterForBatch(n: number): void {
    if (n === 0) {
      this.withdrawal_filtered_messages = this.withdrawal_messages;
      return;
    }
    // Converti e arrotonda le date ai minuti
    const roundedMessages = this.withdrawal_messages
      .map((log) => {
        const dateObject = new Date(log.date); // Converte in oggetto Date
        if (isNaN(dateObject.getTime())) return null; // Ignora date non valide
  
        // Arrotonda ai minuti
        dateObject.setMilliseconds(0);
  
        return {
          ...log,
          dateObject, // Oggetto Date arrotondato
          roundedDate: dateObject.toISOString(), // ISO stringa per raggruppamento univoco
        };
      })
      .filter((log) => log !== null) as any[]; // Rimuove valori nulli
  
    // Ordina i messaggi per data decrescente
    const sortedMessages = roundedMessages.sort(
      (a, b) => b.dateObject.getTime() - a.dateObject.getTime()
    );
  
    // Raggruppa i messaggi in base alla data arrotondata
    const groups: Record<number, any[]> = {};
    let currentGroupIndex = 1;
    let currentGroup: any[] = [];
    let lastRoundedDate = sortedMessages[0]?.roundedDate;
  
    sortedMessages.forEach((log) => {
      if (log.roundedDate !== lastRoundedDate) {
        // Cambia gruppo se la data è diversa
        currentGroupIndex++;
        lastRoundedDate = log.roundedDate;
        currentGroup = [];
      }
  
      if (!groups[currentGroupIndex]) {
        groups[currentGroupIndex] = currentGroup;
      }
  
      groups[currentGroupIndex].push(log);
    });
  
    // Filtra per il gruppo richiesto (1 = gruppo più recente, 2 = secondo più recente, ecc.)
    this.withdrawal_filtered_messages = groups[n] || this.withdrawal_messages;
  }

  clearUrgentLogs(): void {
    this.apiService.clearUrgentLogs().subscribe(() => {
      window.location.reload(); 
    });
  }
}
 */