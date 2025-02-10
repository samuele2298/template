/* import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Opportunity, opStatusClass } from '../../common/model/opportunity';
import { ApiService } from '../../api.service';
import { Oporder, orderStatus, orderStatusClass } from '../../common/model/oporder';
import { WebsocketService } from '../../websocket.service';
import { Subject, filter, takeUntil } from 'rxjs';
import { TabledataService } from '../../tabledata.service';
import { NgIf, NgFor, DatePipe } from '@angular/common';
import { ClrAlertModule, ClrDropdownModule, ClrLoadingButtonModule, ClrLoadingModule, ClrLoadingState } from '@clr/angular';

@Component({
    selector: 'app-opportunity',
    templateUrl: './opportunity.component.html',
    styleUrls: ['./opportunity.component.css'],
    standalone: true,
    imports: [NgIf, NgFor, DatePipe, ClrDropdownModule, ClrAlertModule, ClrLoadingButtonModule, ClrLoadingModule]
})
export class OpportunityComponent implements OnInit, OnDestroy {
    ops: Opportunity[] = [];
    orderStatus = orderStatus;
    orderStatusClass = orderStatusClass;
    opStatusClass = opStatusClass;
    stop$ = new Subject<void>();
    loadingState: ClrLoadingState = ClrLoadingState.LOADING;
    private apiService = inject(ApiService);
    private websocketService = inject(WebsocketService);
    private tableDataService = inject(TabledataService);


    constructor(
    ) { }

    ngOnDestroy(): void {
        this.stopFunc();
    }

    stopFunc() {
        this.stop$.next();
        this.stop$.unsubscribe();
    }

    ngOnInit(): void {
        this.getOpportunities();
        this.listenWebsocketMess();
    }

    listenWebsocketMess() {

        const update$ = this.websocketService.messageReceived.pipe(
            filter((mess) => mess.action === 'update'),
            takeUntil(this.stop$)
        );

        update$.subscribe((message: any) => {
            console.log('mess: ' + message);
            console.log('mess: ' + this.ops);
            this.getOpportunities();
        });
    };

    getOpportunities() {
        this.apiService.getOpportsAndOrders().subscribe(ops => {
            this.loadingState = ClrLoadingState.DEFAULT;
            for (const op of ops) {
                op.oporders = op.oporders.sort((a, b) => {
                    const ora = +a.orinitdate;
                    const orb = +b.orinitdate;
                    if (ora < orb) {
                        return -1;
                    }
                    if (ora > orb) {
                        return 1;
                    }
                    return 0;
                });
                for (const opord of op.oporders) {
                    if (opord.orstatus === '5') {
                        opord.loadingState = ClrLoadingState.LOADING;
                    }
                    else {
                        opord.loadingState = ClrLoadingState.DEFAULT;
                    }
                }
            }
            this.ops = ops.sort((a, b) => {
                const valA = +a.opdate;
                const valB = +b.opdate;
                if (valB < valA) {
                    return -1;
                }
                if (valB > valA) {
                    return 1;
                }
                return 0;
            });
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

    abortOrder(ord: Oporder) {
        ord.loadingState = ClrLoadingState.LOADING;
        this.apiService.cancelOrder(ord).subscribe(resp => {
            if (resp.success) {
                ord.loadingState = ClrLoadingState.SUCCESS;
            }
            else {
                ord.loadingState = ClrLoadingState.ERROR;
            }
        });
    }
}
 */