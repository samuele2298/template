/* import { Component, inject } from '@angular/core';
import { Opportunity, opStatusClass } from '../../common/model/opportunity';
import { orderStatus, orderStatusClass } from '../../common/model/oporder';
import { ApiService } from '../../api.service';
import { TabledataService } from '../../tabledata.service';
import { ClrSpinnerModule, ClrAlertModule, ClrLoadingState, ClrLoadingModule, ClrLoadingButtonModule, ClrInputModule } from '@clr/angular';
import { NgIf, NgFor, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-op-history',
    templateUrl: './op-history.component.html',
    styleUrls: ['./op-history.component.css'],
    standalone: true,
    imports: [NgIf, ClrSpinnerModule, ClrAlertModule, NgFor, DatePipe, FormsModule, ClrLoadingModule, ClrLoadingButtonModule, ClrInputModule]
})
export class OpHistoryComponent {
    ops: Opportunity[] = [];
    ops_filt: Opportunity[] = [];
    orderStatus = orderStatus;
    orderStatusClass = orderStatusClass;
    opStatusClass = opStatusClass;
    private apiService = inject(ApiService);
    private tableDataService = inject(TabledataService);
    searchFilter: string = '';
    loadingState: ClrLoadingState = ClrLoadingState.DEFAULT;

    constructor(
    ) { }

    ngOnInit(): void {
        this.getHistory();
    }

    getHistory() {
        this.loadingState = ClrLoadingState.LOADING;
        this.apiService.getHistory().subscribe(ops => {
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
            this.ops_filt = [...this.ops];
            this.applySearchFilter();
            this.loadingState = ClrLoadingState.SUCCESS;
        });
    }

    getExchangeName(key: string) {
        return this.tableDataService.getExchangeName(key);
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
}

 */