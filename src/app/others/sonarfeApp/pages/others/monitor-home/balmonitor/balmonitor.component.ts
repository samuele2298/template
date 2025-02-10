/* import { Component, ElementRef, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { ClrCheckboxModule, ClrComboboxModule, ClrDropdownModule, ClrInputModule, ClrLoadingButtonModule, ClrLoadingModule, ClrLoadingState, ClrModalModule, ClrProgressBarModule, ClrRangeModule, ClrSelectModule } from '@clr/angular';
import { Subject, Subscription, interval } from 'rxjs';
import { WebsocketService } from '../../../websocket.service';
import { MonitorService } from '../monitor.service';
import { KeyValuePipe, NgFor, NgIf } from '@angular/common';
import { Balmonitor, BalmonitorSym } from '../../../common/model/balmonitor';
import { FormsModule, NgForm } from '@angular/forms';
import { Withdraw } from '../../../common/model/coin';
import { ApiService } from '../../../api.service';

@Component({
    selector: 'app-balmonitor',
    standalone: true,
    imports: [ClrProgressBarModule, FormsModule, NgFor, KeyValuePipe, ClrLoadingModule, ClrLoadingButtonModule, NgIf, ClrDropdownModule, ClrModalModule, ClrInputModule, ClrComboboxModule, ClrSelectModule, ClrRangeModule, ClrCheckboxModule],
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
        amount: 0,
        chaindesc: null,
        chain: null,
        chainid: null,
        desc: null,
        contract: null
    }

    ngOnInit(): void {
        this.getBalMonitor();
        this.updateSubscription = interval(3600000).subscribe(() => this.updateAllExchangeBalance());//Rilancio update ogni ora
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
                        if (exch.st === 0) {
                            tmpclasstd.push('stdisabled');
                            exch.sym2.classtd = 'stdisabled';
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
                    else if (exch.st === 0) {
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
                        if (percval <= -2) {
                            iterator.thrstotbalunder2 = true;
                        }
                        else if (percval >= 2) {
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
        this.wdFeeUSDT = (this.wdProgressChange * this.wdModel.fee).toFixed(2);
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

}
 */