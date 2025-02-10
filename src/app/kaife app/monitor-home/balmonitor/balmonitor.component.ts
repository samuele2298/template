import { Component, ElementRef, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { ClrCheckboxModule, ClrComboboxModule, ClrDropdownModule, ClrInputModule, ClrLoadingButtonModule, ClrLoadingModule, ClrLoadingState, ClrModalModule, ClrProgressBarModule, ClrRangeModule, ClrSelectModule } from '@clr/angular';
import { Subject, Subscription, interval, filter, takeUntil } from 'rxjs';
import { WebsocketService } from '../../websocket.service';
import { MonitorService } from '../monitor.service';
import { KeyValuePipe, NgFor, NgIf, CommonModule } from '@angular/common';
import { Balmonitor, BalmonitorSym, ExchDataPrice, ExchStatus, MissingWdRecord, BalmonitorExchange } from '../../common/model/balmonitor';
import { FormsModule, NgForm } from '@angular/forms';
import { Withdraw } from '../../common/model/withdraw';
import { ApiService } from '../../api.service';
import { TabledataService } from '../../tabledata.service';
import { Oporder, orderStatus, orderStatusClass } from '../../common/model/oporder';
import { Opportunity, opStatusClass } from '../../common/model/opportunity';
import { Withdrawinprogress } from '../../common/model/withdrawlist';

@Component({
    selector: 'app-balmonitor',
    standalone: true,
    imports: [ClrProgressBarModule, FormsModule, NgFor, KeyValuePipe, ClrLoadingModule, ClrLoadingButtonModule, NgIf, ClrDropdownModule, ClrModalModule, ClrInputModule, ClrComboboxModule, ClrSelectModule, ClrRangeModule, ClrCheckboxModule, CommonModule],
    templateUrl: './balmonitor.component.html',
    styleUrl: './balmonitor.component.css'
})
export class BalmonitorComponent implements OnInit, OnDestroy {
    @ViewChild('rangeAmountControl', {static: false}) rangeAmountControl!: ElementRef;
    monitorService = inject(MonitorService);
    apiService = inject(ApiService);
    private websocketService = inject(WebsocketService);
    private updateSubscription!: Subscription;
    stop$ = new Subject<void>();
    Math = Math;
    balMonitor: Balmonitor[] = [];
    exchange_names: string[] = [];
    exchange_totals: string[] = [];
    exchange_ids: string[] = [];
    exchange_total = 0;
    loadingState: ClrLoadingState = ClrLoadingState.DEFAULT;
    showModalWithdraw = false;
    confirmModalWithdraw = false;
    showModalWdMissing = false;
    loadingWithdrawals: ClrLoadingState = ClrLoadingState.DEFAULT;
    sendWithdrawalState: ClrLoadingState = ClrLoadingState.DEFAULT;
    wdDestExchs: Withdraw[] = [];
    wdDestSelected: any;
    wdDestProgressVal = 0;
    wdDestProgressValInitial = 0;
    wdDestProgressMax = 0;
    wdDestProgressUsdt = 0;
    wdProgressChange = 0;
    wdDestProgressTitle = '';
    wdSrcProgressVal = 0;
    wdSrcProgressValInitial = 0;
    wdSrcProgressMax = 0;
    wdSrcProgressUsdt = 0;
    wdSrcProgressUsdtInitial = 0;
    wdSrcProgressTitle = '';
    wdFeeUSDT = '';
    rangeAmountDisabled = true;
    rangeAmountVal = 0;
    balTotal: any = {};
    balTotalCurrency: any = {};
    balTotalCurrencySum: any = {};
    updateAllExchangeBalanceState: ClrLoadingState = ClrLoadingState.DEFAULT;
    tradingEnabled = true;
    withdrawEnabled = true;
    wdRoutes: any = {};
    volumeSlider: number = 0.5;

    wdModel = {
        srcexchange: '',
        srcexchangeid: 0,
        srccoin: '',
        srcsymnum: '',
        dstexchangeid: 0,
        available: 0,
        available_usdt: 0,
        dstexchange: '',
        dstaddress: null,
        memotag: null,
        fee: 0,
        feeusdt: 0,
        amount: 0,
        chaindesc: null,
        chain: null,
        chainid: null,
        desc: null,
        contract: null
    }

    //PER OPP IN PROGRESS
    ops: Opportunity[] = [];
    orderStatus = orderStatus;
    orderStatusClass = orderStatusClass;
    opStatusClass = opStatusClass;
    private tableDataService = inject(TabledataService);

    //PER WDS IN PROGRESS
    wds: Withdrawinprogress[] = [];

    //PER WDS IN PROGRESS
    kavgs: ExchDataPrice = {};

    //PER Exch Status
    exchs: ExchStatus[] = [];

    //PER mssing records
    missingWdRecords: MissingWdRecord = {};
    missingWdRecordsPair: string[] = [];

    ngOnInit(): void {
        this.reload();
        this.listenWebsocketMess();
        this.volumeSlider = this.monitorService.getVolume();
    }

    ngOnDestroy(): void {
        this.stopFunc();
        if (this.updateSubscription) {
            this.updateSubscription.unsubscribe();
        }
    }

    stopFunc() {
        this.stop$.next();
        this.stop$.unsubscribe();
    }

    reload() {
        this.getBalMonitor();
        this.updateSubscription = interval(3600000).subscribe(() => this.updateAllExchangeBalance());//Rilancio update ogni ora
        this.getOpportunities();
        this.getWithdrawals();
        this.getExchDataPrice();
        this.getExchStatus();
    }

    onChangeTradingEnabled(control: any) {
        const tradingEnabled = control.currentTarget.checked ? true : false;
        if (tradingEnabled) {
            this.apiService.setTradingEnabled().subscribe(result => {
                if (result) {
                    console.log('trading enabled');
                    this.tradingEnabled = true;
                }
                else {
                    console.log('trading NOT enabled');
                }
            });
        }
        else {
            this.apiService.setTradingDisabled().subscribe(result => {
                if (result) {
                    console.log('trading disabled');
                    this.tradingEnabled = false;
                }
                else {
                    console.log('trading NOT disabled');
                }
            });
        }
    }

    onChangeWithdrawEnabled(control: any) {
        const withdrawEnabled = control.currentTarget.checked ? true : false;
        if (withdrawEnabled) {
            this.apiService.setWithdrawEnabled().subscribe(result => {
                if (result) {
                    console.log('withdraw enabled');
                    this.withdrawEnabled = true;
                }
                else {
                    console.log('withdraw NOT enabled');
                }
            });
        }
        else {
            this.apiService.setWithdrawDisabled().subscribe(result => {
                if (result) {
                    console.log('withdraw disabled');
                    this.withdrawEnabled = false;
                }
                else {
                    console.log('withdraw NOT disabled');
                }
            });
        }
    }

    getBalMonitor() {
        this.loadingState = ClrLoadingState.LOADING;
        this.exchange_names.length = 0;
        this.exchange_totals.length = 0;
        this.exchange_ids.length = 0;
        this.exchange_total = 0;
        this.apiService.getTradingEnabled().subscribe(data => this.tradingEnabled = data.tradingenabled);
        this.apiService.getWithdrawEnabled().subscribe(data => this.withdrawEnabled = data.withdrawenabled);
        this.monitorService.getBalMonitor().subscribe(bals => {
            this.balMonitor = bals.sort((a, b) => {
                const valA = a.name;
                const valB = b.name;
                if (valA < valB) {
                    return -1;
                }
                if (valA > valB) {
                    return 1;
                }
                return 0;
            });
            for (const bal of bals) {
                for (const exch of bal.exchange) {
                    const tmpclasstd = ['leftbord'];

                    if (exch.configured) {
                        if (exch.st === 2) {
                            if (exch.watch === 1) {
                                tmpclasstd.push('stnotallowed');
                                exch.sym2.classtd = 'stnotallowed';
                            }
                            else if (exch.watch === 0) {
                                tmpclasstd.push('stnotallowednowatch');
                                exch.sym2.classtd = 'stnotallowednowatch';
                            }
                        }
                        if (exch.st === 5) {
                            tmpclasstd.push('stdisabled');
                            exch.sym2.classtd = 'stdisabled';
                        }
                        if (exch.st === 0) {
                            if (exch.watch === 1) {
                                let classtd = 'stonlydata';
                                exch.sym2.classtd = 'stonlydata';
                                tmpclasstd.push(classtd);
                            }
                        }
                        if (exch.st === 1) {
                            if (exch.watch === 1) {
                                let classtd = '';
                                const sym1perc = exch.sym1.usdt * 100 / exch.sym1.max;
                                const sym2perc = exch.sym2.usdt * 100 / exch.sym2.max;

                                if (sym2perc > exch.sym2.monitor_max_color) {
                                    exch.sym2.classtd = 'highbalthrs';
                                }
                                if (exch.sym2.usdt >= exch.sym2.max) {
                                    exch.sym2.classtd = 'highbal';
                                }
                                if (sym2perc < exch.sym2.monitor_min_color) {
                                    exch.sym2.classtd = 'lowbalthrs';
                                }
                                if (exch.sym2.usdt < exch.sym2.min) {
                                    exch.sym2.classtd = 'lowbal';
                                }

                                if (sym1perc > exch.sym1.monitor_max_color) {
                                    classtd = 'highbalthrs';
                                }
                                if (exch.sym1.usdt >= exch.sym1.max) {
                                    classtd = 'highbal';
                                }
                                if (sym1perc < exch.sym1.monitor_min_color) {
                                    classtd = 'lowbalthrs';
                                }
                                if (exch.sym1.usdt < exch.sym1.min) {
                                    classtd = 'lowbal';
                                }
                                tmpclasstd.push(classtd);
                            }
                        }
                    }
                    else {
                        tmpclasstd.push('notconfigured');
                        exch.sym2.classtd = 'notconfigured';
                    }
                    exch.sym1.classtd = tmpclasstd.join(' ');

                    if (exch.st === 2) {
                        if (exch.watch === 0) {
                            exch.sym1.classpbar = 'stnotallowednowatch';
                            exch.sym2.classpbar = 'stnotallowednowatch';
                        }
                        else if (exch.watch === 1) {
                            exch.sym1.classpbar = 'stnotallowed';
                            exch.sym2.classpbar = 'stnotallowed';
                        }
                    }
                    else if (exch.st === 5) {
                        exch.sym1.classpbar = 'stdisabled';
                        exch.sym2.classpbar = 'stdisabled';
                    }
                }
            }

            for (const bal of bals) {
                for (const exch of bal.exchange) {
                    this.exchange_names.push(exch.name);
                    this.exchange_ids.push(exch.id.toString());
                    this.balTotal[exch.name] = {};
                    this.balTotalCurrency[exch.name] = {};
                }
                this.loadingState = ClrLoadingState.SUCCESS;
                break;
            }
            // totali balance
            for (const bal of bals) {
                for (const exch of bal.exchange) {
                    if (exch.watch === 0) {
                        continue;
                    }
                    if (!(exch.sym1.name in this.balTotal[exch.name])) {
                        this.balTotal[exch.name][exch.sym1.name] = exch.sym1.usdt;
                        this.balTotalCurrency[exch.name][exch.sym1.name] = exch.sym1.val;
                    }
                    if (!(exch.sym2.name in this.balTotal[exch.name])) {
                        this.balTotal[exch.name][exch.sym2.name] = exch.sym2.usdt;
                        this.balTotalCurrency[exch.name][exch.sym2.name] = exch.sym2.val;
                    }
                }
            }
            for (const exchName in this.balTotal) {
                let total = 0;
                if (Object.prototype.hasOwnProperty.call(this.balTotal, exchName)) {
                    for (const curval of Object.values(this.balTotal[exchName])) {
                        total += curval as number;
                    }
                }
                for (const [currency, val] of Object.entries(this.balTotalCurrency[exchName])) {
                    if (currency in this.balTotalCurrencySum) {
                        this.balTotalCurrencySum[currency]['curr'] += val;
                        this.balTotalCurrencySum[currency]['usdt'] += this.balTotal[exchName][currency];
                    }
                    else {
                        this.balTotalCurrencySum[currency] = {
                            curr: val,
                            usdt: this.balTotal[exchName][currency]
                        }
                    }
                }
                this.exchange_totals.push(total.toFixed(2));
                this.exchange_total += total;
            }
            for (const iterator of this.balMonitor) {
                const [curr1, curr2] = iterator.name.split('/');
                if (curr1 in this.balTotalCurrencySum) {
                    iterator.sumcurr = this.balTotalCurrencySum[curr1]['curr'];
                    iterator.sumusdt = this.balTotalCurrencySum[curr1]['usdt'];
                    if (iterator.thrstotbal > 0) {
                        const percval = (this.balTotalCurrencySum[curr1]['curr'] / iterator.thrstotbal * 100) - 100;
                        if (percval <= -3) {
                            iterator.thrstotbalunder2 = true;
                        }
                        else if (percval >= 3) {
                            iterator.thrstotbalover2 = true;
                        }
                    }
                    delete this.balTotalCurrencySum[curr1];
                }
            }
        });
    }

    withdraw(sym: BalmonitorSym, exchid: number, exchname: string, symnum: string, form: NgForm) {
        this.showModalWithdraw = true;
        this.rangeAmountDisabled = true;
        this.wdDestProgressVal = 0;
        this.wdDestProgressValInitial = 0;
        this.wdDestProgressMax = 0;
        this.wdDestProgressUsdt = 0;
        this.wdProgressChange = 0;
        this.wdDestProgressTitle = '';
        this.wdSrcProgressVal = 0;
        this.wdSrcProgressValInitial = 0;
        this.wdSrcProgressMax = 0;
        this.wdSrcProgressUsdt = 0;
        this.wdSrcProgressUsdtInitial = 0;
        this.wdSrcProgressTitle = '';
        this.wdFeeUSDT = '';
        this.rangeAmountDisabled = true;
        this.rangeAmountVal = 0;
        form.form.reset();
        setTimeout(() => {
            this.loadingWithdrawals = ClrLoadingState.LOADING;
            this.wdModel.srcexchange = exchname;
            this.wdModel.srcexchangeid = exchid;
            this.wdModel.srccoin = sym.name;
            this.wdModel.available = sym.val;
            this.wdModel.available_usdt = sym.usdt;
            this.wdModel.srcsymnum = symnum;
            this.wdProgressChange = sym.usdt / sym.val;
            this.monitorService.getWdForSourceAndDest(exchid, symnum).subscribe(data => {
                this.wdDestExchs = data.sort((a, b) => {
                    const valA = a.Kexch_name;
                    const valB = b.Kexch_name;
                    if (valA < valB) {
                        return -1;
                    }
                    if (valA > valB) {
                        return 1;
                    }
                    return 0;
                });
                this.loadingWithdrawals = ClrLoadingState.SUCCESS;
                this.wdSrcProgressVal = sym.val;
                this.wdSrcProgressValInitial = sym.val;
                this.wdSrcProgressUsdt = sym.usdt;
                this.wdSrcProgressMax = sym.max;
                this.wdSrcProgressTitle = `${sym.name} ${sym.val}`;
            });
        }, 200);
    }

    displayConfirmWithdraw() {
        this.confirmModalWithdraw = true;
    }

    executeWithdraw() {
        this.confirmModalWithdraw = false;
        this.sendWithdrawalState = ClrLoadingState.LOADING;
        this.monitorService.sendWithdraw(this.wdModel).subscribe(resp => {
            if (resp.success) {
                this.sendWithdrawalState = ClrLoadingState.SUCCESS;
                setTimeout(() => {
                    this.showModalWithdraw = false;
                }, 1000);
            }
            else {
                this.sendWithdrawalState = ClrLoadingState.ERROR;
            }
        });
    }

    onChangeExchange(selection: any) {
        if (!selection.model) {
            return;
        }
        const first = this.balMonitor.find(o => o.name.split('/')[0] === this.wdModel.srccoin);
        if (first) {
            const sym1 = first.exchange.find(o => o.id === selection.model.Kwithdrawal_dest_Kexch_id);
            if (sym1) {
                this.wdDestProgressVal = sym1.sym1.val;
                this.wdDestProgressUsdt = sym1.sym1.usdt;
                this.wdDestProgressValInitial = sym1.sym1.val;
                this.wdDestProgressMax = sym1.sym1.max;
                this.wdDestProgressTitle = `${sym1.sym1.name} ${sym1.sym1.val}`; 
                //this.wdProgressChange = sym1.sym1.usdt / sym1.sym1.val;
            }
        }
        else {
            const second = this.balMonitor.find(o => o.name.split('/')[1] === this.wdModel.srccoin);
            if (second) {
                const sym2 = second.exchange.find(o => o.id === selection.model.Kwithdrawal_dest_Kexch_id);
                if (sym2) {
                    this.wdDestProgressVal = sym2.sym2.val;
                    this.wdDestProgressUsdt = sym2.sym2.usdt;
                    this.wdDestProgressValInitial = sym2.sym2.val;
                    this.wdDestProgressMax = sym2.sym2.max;
                    this.wdDestProgressTitle = `${sym2.sym2.name} ${sym2.sym2.val}`;
                    //this.wdProgressChange = sym2.sym2.usdt / sym2.sym2.val;
                }
            }
        }
        //.exchange.find(e => e.id === selection.model)
        this.wdModel.dstexchange = selection.model.Kexch_name;
        this.wdModel.dstexchangeid = selection.model.Kwithdrawal_dest_Kexch_id;
        this.wdModel.dstaddress = selection.model.Kwithdrawal_address;
        this.wdModel.memotag = selection.model.Kwithdrawal_memotag;
        this.wdModel.fee = selection.model.Kwithdrawal_fee;
        this.wdModel.feeusdt = selection.model.Kwithdrawal_feeusdt;
        this.wdModel.chaindesc = selection.model.Kchain_desc;
        this.wdModel.chain = selection.model.Kchainref_name;
        this.wdModel.desc = selection.model.Kwithdrawal_desc;
        this.wdModel.chainid = selection.model.Kwithdrawal_Kchain_id;
        this.wdModel.contract = selection.model.Kwithdrawal_contract;
        this.rangeAmountDisabled = false;
        //Add change to the src when load change an exchange based on the previous rangeVal
        let previous_rangeval = 0;
        try {
            previous_rangeval = parseInt(this.rangeAmountControl.nativeElement.value, 10); 
        }catch(e){
            previous_rangeval = this.rangeAmountVal;
        }
        this.amountWithdrawChange({
            target: {
                name: '',
                value: previous_rangeval
            }
        });
        this.wdFeeUSDT = this.wdModel.fee === 0 ? 'Unknown' : (this.wdProgressChange * this.wdModel.fee ).toFixed(2);
        // setTimeout(() => {
        //   this.inputAmount.nativeElement.focus();
        // });
    }

    amountWithdrawChange(event: any) {
        let currval = event.target.value;
        if (event.target.name === 'amount') {
            currval = +currval / this.wdSrcProgressValInitial * 100;
        }
        const srcselected_val = this.wdSrcProgressValInitial / 100 * currval;
        const valsub = this.wdSrcProgressValInitial - srcselected_val;
        const srcvalusdt = this.wdProgressChange * valsub;

        this.wdSrcProgressUsdt = srcvalusdt;
        this.wdSrcProgressVal = valsub;
        //const destselected_val = this.wdDestProgressValInitial / 100 * currval;

        const valadd = this.wdDestProgressValInitial + srcselected_val;
        const destvalusdt = this.wdProgressChange * valadd;

        this.wdDestProgressUsdt = destvalusdt;
        this.wdDestProgressVal = valadd;
        if (event.target.name === 'amount') {
            this.rangeAmountVal = currval;
        }
        else {
            // Se il valore in usdt della cripto è sopra i 300 parse int
            if (this.wdProgressChange <= 300) {
                this.wdModel.amount = parseFloat(srcselected_val.toFixed(0));
            } else {
                this.wdModel.amount = parseFloat(srcselected_val.toFixed(4));
            }

        }
    }

    updateAllExchangeBalance() {
        for (const exchid of this.exchange_ids) {
            this.updateAllExchangeBalanceState = ClrLoadingState.LOADING;
            this.apiService.sendBalanceUpdateRequest(exchid.toString()).subscribe(response => {
                this.updateAllExchangeBalanceState = ClrLoadingState.SUCCESS;
            });
        }
    }

    destExchangesText() {

    }

    //WS per opp in progress
    listenWebsocketMess() {
        const update$ = this.websocketService.messageReceived.pipe(
            filter((mess) => mess.action === 'update'),
            takeUntil(this.stop$)
        );

        update$.subscribe((message: any) => {
            //console.log('mess: ' + message);
            //console.log('mess: ' + this.ops);
            this.getOpportunities();
        });

        const kavarage$ = this.websocketService.messageReceived.pipe(
            filter((mess) => mess.action === 'kaverage-update'),
            takeUntil(this.stop$)
        );

        kavarage$.subscribe((message: any) => {
            this.kavgs = message.data
        });

        const wd$ = this.websocketService.messageReceived.pipe(
            filter((mess) => mess.action === 'wd-update'),
            takeUntil(this.stop$)
        );

        wd$.subscribe((message: any) => {
            //console.log('mess: ' + message);
            //console.log('mess: ' + this.ops);
            this.getWithdrawals();
        });

        const balance$ = this.websocketService.messageReceived.pipe(
            filter((mess) => mess.action === 'bal-update'),
            takeUntil(this.stop$)
        );

        balance$.subscribe((message: any) => {
            //console.log('mess: ' + message);
            //console.log('mess: ' + this.ops);
            this.updateBalance(message.data);
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

    getWithdrawals() {
        this.apiService.getWithdrawalsInprogress().subscribe(wds => {
            this.loadingState = ClrLoadingState.DEFAULT;
            this.wds = wds.sort((a, b) => {
                const valA = new Date(a.createtime).getTime();
                const valB = new Date(b.createtime).getTime();
                if (valB < valA) {
                    return -1; 
                }
                if (valB > valA) {
                    return 1;
                }
                return 0;
            });
            this.loadingState = ClrLoadingState.SUCCESS;
            //console.log(wds);
        });
    }

    getExchDataPrice() {
        this.monitorService.getExchDataPrice().subscribe(data => {
            this.loadingState = ClrLoadingState.DEFAULT;
            this.kavgs = Array.isArray(data) ? {} : (data as ExchDataPrice);
            this.loadingState = ClrLoadingState.LOADING;
        });
    }

    getExchStatus() {
        this.monitorService.getExchStatus().subscribe(data => {
            this.loadingState = ClrLoadingState.DEFAULT;
            this.exchs = data;
            this.loadingState = ClrLoadingState.LOADING;
            //console.log(this.exchs);
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

    isInProgressClass(sym1: number, sym2: number, exch: number, isFirst :boolean, default_class: string | null) : string {
        if (Array.isArray(this.ops) && this.ops.length > 0) {
            for(const op of this.ops){
                let sym1b = op.oppair.slice(0, 4); 
                let sym2b = op.oppair.slice(4);  
                if(sym1b === sym1.toString() && sym2b === sym2.toString()){
                    if ( op.oppri == 'B' ){
                        if(op.A.exchid == exch.toString().padStart(3, '0')  && isFirst) {
                            return 'stinprogressgreen'
                        }
                        else if(op.B.exchid == exch.toString().padStart(3, '0') && !isFirst) {    
                            return 'stinprogressgreen';
                        }
                        else if(op.A.exchid == exch.toString().padStart(3, '0') && !isFirst) {
                            return 'stinprogressred';
                        }
                        else if(op.B.exchid == exch.toString().padStart(3, '0') && isFirst)  {
                            return 'stinprogressred';
                        }
                    }else if ( op.oppri == 'A' ) {//Case 'A'
                        if(op.A.exchid == exch.toString().padStart(3, '0')  && !isFirst) {
                            return 'stinprogressgreen'
                        }
                        else if(op.B.exchid == exch.toString().padStart(3, '0') && isFirst) {    
                            return 'stinprogressgreen';
                        }
                        else if(op.A.exchid == exch.toString().padStart(3, '0') && isFirst) {
                            return 'stinprogressred';
                        }
                        else if(op.B.exchid == exch.toString().padStart(3, '0') && !isFirst)  {
                            return 'stinprogressred';
                        }
                    }
                    else return default_class!;
                }
            }
            return default_class!;
        }            
        return default_class!;
    }

    isWDInProgressClass(sym1: number, exch: number, default_class: string | null) : string {
        if (Array.isArray(this.wds) && this.wds.length > 0) {
            for(const wd of this.wds){
                const from = wd.fromexch; 
                const to = wd.toexch; 
                if(sym1.toString() === wd.symn && (from == exch || to == exch )){
                    if (from == exch)
                        return 'wdProgressSender';  
                    else 
                        return 'wdProgressReceiver';  
                }
            }
            return default_class!;
        }            
        return default_class!;
    }

    onVolumeChange(vol: number): void {
        this.monitorService.setVolume(vol);
    }

    isKvgOrWdInProgress(sym1: number, sym2: number, exch: number, default_class: string | null, pairStatusTrade: number, isFirst: boolean) : string {
        //Se è true wd significa che dovrà valutare anche se è wd, Kavg outdate ha priorità sopra al wd in progress 
        let result = '';
        if (isFirst) 
            result = this.isWDInProgressClass(sym1, exch, default_class);
        if(Object.keys(this.kavgs).length > 0){
            const pair = sym1.toString()+ sym2.toString();
            const kexch = '00' + exch.toString();
            if (!this.kavgs[pair]?.[kexch] && pairStatusTrade == 1 ) 
                return 'wdProgressOutdate'; 
            if (!this.kavgs[pair]?.[kexch] &&  pairStatusTrade == 0) 
                return 'wdProgressOutdateOnlyData'; 
        }
        return isFirst? result : default_class! ;
    }

    getExchStatusClass(name: string): string{
        const id = Number(name.trim().split(' ')[0]);
        //console.log(id  );
        //console.log(this.exchs );

        for(const exch of this.exchs){
            if (exch.id == id)
                return exch.status == 0 ? 'badge badge-danger' : exch.status == 1 ? 'badge badge-success' : 'badge badge-warning';
        }
        return 'badge badge-success';
    }

    openMissingRecordsWd(){
        this.loadingState = ClrLoadingState.DEFAULT;
        this.monitorService.getMissingWdRecords().subscribe(wds => {
            this.missingWdRecords = Array.isArray(wds) ? {} : (wds as MissingWdRecord);
            this.missingWdRecordsPair = Object.keys(this.missingWdRecords);
            this.showModalWdMissing = true;
        });
        this.loadingState = ClrLoadingState.SUCCESS;
    }

    getPairExchs(pair: string){
        return Object.keys(this.missingWdRecords[pair]);
    }

    getListOfExchs(pair: string, exch: string){
        return this.missingWdRecords[pair][exch];
    }

    updateBalance(data: any): void{
        /*{//WHAT I RECEIVE FROM KAVERAGE
            "key":"bal0020039",
            "val":{
                "status":"ok",
                "bal":"50659.03",
                "balusdt":2840.4518120999996,
                "updatetime":1734365322225
            }
        }*/
        const exch = Number(data.key.slice(3, 6)); 
        const sym = Number(data.key.slice(6));   
        const bal = Number(data.val.bal);   
        const balusdt = Number(data.val.balusdt);   
        let classtd = '';
        if (this.balMonitor) {
            for (const monitor of this.balMonitor) {
                const sym1m = Number(monitor.symnum.slice(0,4));
                const sym2m = Number(monitor.symnum.slice(-4));
                if(sym1m == sym || sym2m == sym){
                    for (const exchange of monitor.exchange) {
                        if(exchange.id == exch){
                            if(sym == Number(exchange.sym1.num)){
                                exchange.sym1.val = bal;
                                exchange.sym1.usdt = balusdt;
                            }
                            if(sym == Number(exchange.sym2.num) ){
                                exchange.sym2.val = bal;
                                exchange.sym2.usdt = balusdt;
                            }
                            const tmpclasstd = ['leftbord'];
        
                            if (exchange.configured) {
                                if (exchange.st === 2) {
                                    if (exchange.watch === 1) {
                                        tmpclasstd.push('stnotallowed');
                                        exchange.sym2.classtd = 'stnotallowed';
                                    }
                                    else if (exchange.watch === 0) {
                                        tmpclasstd.push('stnotallowednowatch');
                                        exchange.sym2.classtd = 'stnotallowednowatch';
                                    }
                                }
                                if (exchange.st === 5) {
                                    tmpclasstd.push('stdisabled');
                                    exchange.sym2.classtd = 'stdisabled';
                                }
                                if (exchange.st === 0) {
                                    if (exchange.watch === 1) {
                                        let classtd = 'stonlydata';
                                        exchange.sym2.classtd = 'stonlydata';
                                        tmpclasstd.push(classtd);
                                    }
                                }
                                if (exchange.st === 1) {
                                    if (exchange.watch === 1) {
                                        let classtd = '';
                                        const sym1perc = exchange.sym1.usdt * 100 / exchange.sym1.max;
                                        const sym2perc = exchange.sym2.usdt * 100 / exchange.sym2.max;
        
                                        if (sym2perc > exchange.sym2.monitor_max_color) {
                                            exchange.sym2.classtd = 'highbalthrs';
                                        }
                                        else if (exchange.sym2.usdt >= exchange.sym2.max) {
                                            exchange.sym2.classtd = 'highbal';
                                        }
                                        else if (sym2perc < exchange.sym2.monitor_min_color) {
                                            exchange.sym2.classtd = 'lowbalthrs';
                                        }
                                        else if (exchange.sym2.usdt < exchange.sym2.min) {
                                            exchange.sym2.classtd = 'lowbal';
                                        }
                                        else exchange.sym2.classtd = '';
        
                                        if (sym1perc > exchange.sym1.monitor_max_color) {
                                            classtd = 'highbalthrs';
                                        }
                                        else if (exchange.sym1.usdt >= exchange.sym1.max) {
                                            classtd = 'highbal';
                                        }
                                        else if (sym1perc < exchange.sym1.monitor_min_color) {
                                            classtd = 'lowbalthrs';
                                        }
                                        else if (exchange.sym1.usdt < exchange.sym1.min) {
                                            classtd = 'lowbal';
                                        }
                                        else classtd = '';
                                        tmpclasstd.push(classtd);
                                    }
                                }
                            }
                            else {
                                tmpclasstd.push('notconfigured');
                                exchange.sym2.classtd = 'notconfigured';
                            }
                            exchange.sym1.classtd = tmpclasstd.join(' ');
        
                            if (exchange.st === 2) {
                                if (exchange.watch === 0) {
                                    exchange.sym1.classpbar = 'stnotallowednowatch';
                                    exchange.sym2.classpbar = 'stnotallowednowatch';
                                }
                                else if (exchange.watch === 1) {
                                    exchange.sym1.classpbar = 'stnotallowed';
                                    exchange.sym2.classpbar = 'stnotallowed';
                                }
                            }
                            else if (exchange.st === 5) {
                                exchange.sym1.classpbar = 'stdisabled';
                                exchange.sym2.classpbar = 'stdisabled';
                            }
                        }
                    }
                }
            }
        }
    }

    getPositiveBalTotal(bal: Balmonitor){
        if(bal.sumcurr! > bal.thrstotbal){
            return bal.sumcurr! -  bal.thrstotbal;
        }
        return 0;
    }

    getNegativeBalTotal(bal: Balmonitor){
        if(bal.sumcurr! <= bal.thrstotbal){
            return bal.thrstotbal*2 - (bal.thrstotbal - bal.sumcurr!);
        }
        return bal.thrstotbal*2;
    }

    isSecondPair(bal: Balmonitor): boolean{
        let count = 0;
        for( const b of this.balMonitor){
            if(bal.name.split('/')[0] == b.name.split('/')[0]) {
                count++;
            }
        }
        if(count == 2){
            if(bal.name.split('/')[1].trim() == 'USDT')
                return true;
        }
        return false;
    }
}
