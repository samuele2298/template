/* import { Component, inject } from '@angular/core';
import { Opportunity, opStatusClass } from '../common/model/opportunity';
import { orderStatus, orderStatusClass } from '../common/model/oporder';
import { ApiService } from '../api.service';
import { TabledataService } from '../tabledata.service';
import { ClrSpinnerModule, ClrAlertModule, ClrLoadingState, ClrLoadingModule, ClrLoadingButtonModule, ClrInputModule, ClrComboboxModule } from '@clr/angular';
import { NgIf, NgFor, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WebsocketService } from '../websocket.service';
import { Subject, filter, takeUntil } from 'rxjs';

@Component({
    selector: 'app-op-history',
    templateUrl: './op-history.component.html',
    styleUrls: ['./op-history.component.css'],
    standalone: true,
    imports: [NgIf, ClrSpinnerModule, ClrAlertModule, NgFor, DatePipe, FormsModule, ClrLoadingModule, ClrLoadingButtonModule, ClrInputModule, ClrComboboxModule]
})
export class OpHistoryComponent {
    ops: Opportunity[] = [];
    ops_filt: Opportunity[] = [];
    stop$ = new Subject<void>();
    orderStatus = orderStatus;
    orderStatusClass = orderStatusClass;
    opStatusClass = opStatusClass;
    private apiService = inject(ApiService);
    private tableDataService = inject(TabledataService);
    private websocketService = inject(WebsocketService);
    loadingState: ClrLoadingState = ClrLoadingState.DEFAULT;

    searchFilter: string = '';
    searchCoin: string = '';
    searchCoin2: string = '';
    searchExch: string = '';
    searchExch2: string = '';
    coins: string[] = [];
    exchanges: string[] = [];

    constructor() {}

    ngOnDestroy(): void {
        this.stopFunc();
    }

    stopFunc() {
        this.stop$.next();
        this.stop$.unsubscribe();
    }

    ngOnInit(): void {
        this.listenWebsocketMess();
        this.getHistory();
        this.getExchanges();
    }

    getHistory() {
        this.loadingState = ClrLoadingState.LOADING;
        const data = {
            coin1: this.searchCoin === 'ALL' ? '' : this.getIndexOfValue(
                this.tableDataService.symsName, 
                this.searchCoin
            ),
            coin2: this.searchCoin2 === 'ALL' ? '' : this.getIndexOfValue(
                this.tableDataService.symsName, 
                this.searchCoin2
            ),
            exch1: this.searchExch === 'ALL' ? '' : this.getIndexOfValue(
                this.tableDataService.exchangeName, 
                this.searchExch),
            exch2: this.searchExch2 === 'ALL' ? '' : this.getIndexOfValue(
                this.tableDataService.exchangeName, 
                this.searchExch2)
        }
        this.apiService.getHistory(data).subscribe(ops => {
            for (const op of ops) {
                op.oporders = op.oporders.sort((a, b) => {
                    const ora = new Date(a.orinitdate);
                    const orb = new Date(b.orinitdate);
                    if (ora < orb) {
                        return -1;
                    }
                    if (orb > ora) {
                        return 1;
                    }
                    return 0;
                });
            }
            this.ops = ops.sort((a, b) => {
                const valA = a.opdate;
                const valB = b.opdate;
                if (valB < valA) {
                    return -1;
                }
                if (valB > valA) {
                    return 1;
                }
                return 0;
            });
            this.ops_filt = this.ops;
            this.applySearchFilter();
            this.getCoins();
            this.getExchanges();
            this.loadingState = ClrLoadingState.SUCCESS;
        });
    }

    getExchangeName(key: string) {
        return this.tableDataService.getExchangeName(key);
    }

    getCoins() {
        setTimeout(() => { //DELAY FOR THE LIST OF THE COIN
            this.coins = Array.from(this.tableDataService.symsName.values());
            this.coins = this.coins.map(desc => desc.split(' ')[0]);
            this.coins.sort((a, b) => a.localeCompare(b));
            this.coins.unshift('ALL');
        }, 500);  
    }

    getExchanges() {
        setTimeout(() => { 
            this.exchanges = Array.from(this.tableDataService.exchangeName.values());
            this.exchanges.sort((a, b) => a.localeCompare(b));
            this.exchanges.unshift('ALL');
        }, 500);  
    }

    getPairName(pairkey: string) {
        const sym1 = this.tableDataService.getPairName(pairkey.substring(0, 4));
        const sym2 = this.tableDataService.getPairName(pairkey.substring(4))
        return sym1 + '/' + sym2;
    }

    applySearchFilter() {
        const upperCaseSearchFilter = this.searchFilter.toUpperCase();

        this.ops = this.ops_filt.filter(filt => {
            const pairName = this.getPairName(filt.oppair).toUpperCase();
            const exchangeNameA = this.getExchangeName(filt['A'].exchid)?.toUpperCase() || '';
            const exchangeNameB = this.getExchangeName(filt['B'].exchid)?.toUpperCase() || '';

            return pairName.includes(upperCaseSearchFilter) ||
                exchangeNameA.includes(upperCaseSearchFilter) ||
                exchangeNameB.includes(upperCaseSearchFilter);
        });
    }

    getEffectiveMargin(op: Opportunity): number {
        let effectiveMargin = 0;
        //Faccio in modo che la quantity del sell sia uguale a quella del buy per combaciare gli arrotondamenti
        let buy_quantity = 0; 
        let sell_quantity = 0; 
        let buy_price = 0;
        let sell_price = 0;

        for(const or of op.oporders){
            if(or.orside==='BUY'){
                buy_quantity += +or.orq;
                buy_price = +or.orprice;
            }
            if(or.orside==='SELL'){
                sell_quantity += +or.orq;
                sell_price = +or.orprice;
            }
        }
        const fee = ((+op.A.q * +op.A.f) + (+op.B.q * +op.B.f));
        if(op.oppri==='B')
            return (sell_price*sell_quantity) - (buy_price*sell_quantity) - fee;
        else 
            return (sell_price*buy_quantity) - (buy_price*buy_quantity) - fee;
    }

    isFilled(op: Opportunity): boolean {
        for(const or of op.oporders){
            if(or.orstatus != '3'){
                return false;
            }
        }
        return true;
    }

    hasAnError(op: Opportunity): boolean {
        for(const or of op.oporders){
            if(or.orstatus == '9'){
                return true;
            }
        }
        return false;
    }

    getOpColor(op: Opportunity): string {
        const color = this.isFilled(op)? '#4caf50': this.hasAnError(op)? '#8C0000': '#a5a5a5';
        return color;
    }

    //WS per aggiornamento op
    listenWebsocketMess() {
        const update$ = this.websocketService.messageReceived.pipe(
            filter((mess) => mess.action === 'update'),
            takeUntil(this.stop$)
        );

        update$.subscribe((message: any) => {
            //console.log('mess: ' + message);
            //console.log('mess: ' + this.ops);
            this.getHistory();
        });
    };

    getDecimalPlaces(op: Opportunity) {
        const getDecimalLength = (num: number) => (num.toString().split('.')[1] || '').length;
        return Math.max(getDecimalLength(Number(op.A.p)), getDecimalLength(Number(op.B.p)));
    }

    getIndexOfValue(map: Map<any, any>, value: string): string {
        for (const [key, val] of map.entries()) {
            if (val === value) {
                return key; // Return the key when the value matches
            }
        }
        return '';
    }
}

 */