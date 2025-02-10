/* import { Component, OnInit, inject } from '@angular/core';
import { ClrDatagridModule, ClrInputModule, ClrLoadingButtonModule, ClrLoadingModule, ClrLoadingState, ClrComboboxModule, ClarityModule} from '@clr/angular';
import { ApiService } from '../api.service';
import { Withdrawlist, wdStatus } from '../common/model/withdrawlist';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { TabledataService } from '../tabledata.service';
import { WebsocketService } from '../websocket.service';
import { Subject, filter, takeUntil } from 'rxjs';

@Component({
    selector: 'app-withdrawal-list',
    standalone: true,
    imports: [ClrDatagridModule, ClrLoadingModule, ClrLoadingButtonModule, FormsModule, DatePipe, ClrInputModule, ClrComboboxModule, ClarityModule],
    templateUrl: './withdrawal-list.component.html',
    styleUrl: './withdrawal-list.component.css'
})
export class WithdrawalListComponent implements OnInit {
    private apiService = inject(ApiService);
    private tableDataService = inject(TabledataService);
    private websocketService = inject(WebsocketService);
    stop$ = new Subject<void>();
    withdrawals: Withdrawlist[] = [];
    coins: string[] = [];
    withdrawals_filt: Withdrawlist[] = [];
    wdStatus = wdStatus;
    searchFilter: string = '';
    searchCoinFilter: string = '';
    loadingState: ClrLoadingState = ClrLoadingState.DEFAULT;
    isModalOpen: boolean = false;

    //Variabile che tiene ID del wd da eliminare
    selectionDeleteWithdraw: string = '';

    //Strutture per filtro status
    statuses: { id: number; name: string }[] = [
        {
            id: -1,
            name: "All"
        },
        {
            id: 0,
            name: 'To Send'
        },
        {
            id: 1,
            name: 'Processing'
        },
        {
            id: 2,
            name: 'Sent But Waiting'
        },
        {
            id: 5,
            name: 'Success'
        },
        {
            id: 6,
            name: 'Not Success'
        },
        {
            id: 9,
            name: 'Error'
        }   
    ];
    selection: { id: number; name: string } = this.statuses[0];

    constructor() {
    }

    ngOnDestroy(): void {
        this.stopFunc();
    }

    stopFunc() {
        this.stop$.next();
        this.stop$.unsubscribe();
    }

    ngOnInit(): void {
        this.listenWebsocketMess();
        this.getWithdrawals();
    }

    getWithdrawals() {
        this.loadingState = ClrLoadingState.LOADING;
        const coinFilter: string = this.searchCoinFilter === 'ALL' ? '' : this.searchCoinFilter;
        this.apiService.getWithdrawals(this.selection.id, coinFilter).subscribe(withdrawals => {
            this.withdrawals = withdrawals;
            this.withdrawals_filt = withdrawals;
            this.applySearchFilter();
            this.getCoins();
            this.loadingState = ClrLoadingState.SUCCESS;  
        });
    }

    getCoins() {
        setTimeout(() => { //DELAY FOR THE LIST OF THE COIN
            this.coins = Array.from(this.tableDataService.symsName.values());
            this.coins = this.coins.map(desc => desc.split(' ')[0]);
            this.coins.sort((a, b) => a.localeCompare(b));
            this.coins.unshift('ALL');
        }, 500);  
    }

    applySearchFilter() {
        this.withdrawals = this.withdrawals_filt.filter(w1 => 
            w1.fromexch.toUpperCase().includes(this.searchFilter.toUpperCase()) || 
            w1.toexch.toUpperCase().includes(this.searchFilter.toUpperCase()) || 
            w1.symn.toUpperCase().includes(this.searchFilter.toUpperCase()) || 
            w1.address.toUpperCase().includes(this.searchFilter.toUpperCase()) || 
            w1.info?.toUpperCase().includes(this.searchFilter?.toUpperCase())
        );
    }

    copyText(text: string) {
        const textarea = document.createElement('textarea');
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
    }

    getTruncatedText(text: string, limit: number): string {
        if (!text) {
            return '';
        }
        return text.length > limit ? text.slice(0, limit) + '...' : text;
    }

    formatNumber(value: number | null): string {
        if (value === null || value === undefined) {
          return '0.00';
        }
        const fixedValue = Number(value).toFixed(2);
        return `${fixedValue}`;
    }

    openWithdrawDeletePopUp(id: string){
        this.isModalOpen = true;
        this.selectionDeleteWithdraw = id;
    }

    deleteWithdraw(){
        if(this.selectionDeleteWithdraw === '') return;
        this.apiService.delWithdraw(this.selectionDeleteWithdraw).subscribe(response => {
            this.getWithdrawals();
        });
        this.isModalOpen = false;
    }

    //WS per aggiornamento op
    listenWebsocketMess() {
        const wd$ = this.websocketService.messageReceived.pipe(
            filter((mess) => mess.action === 'wd-update'),
            takeUntil(this.stop$)
        );

        wd$.subscribe((message: any) => {
            //console.log('mess: ' + message);
            //console.log('mess: ' + this.ops);
            this.getWithdrawals();
        });
    };
}
 */