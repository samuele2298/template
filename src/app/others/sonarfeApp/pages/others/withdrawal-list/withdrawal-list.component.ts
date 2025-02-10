/* import { Component, OnInit, inject } from '@angular/core';
import { ClrDatagridModule, ClrInputModule, ClrLoadingButtonModule, ClrLoadingModule, ClrLoadingState, ClrComboboxModule, ClarityModule} from '@clr/angular';
import { ApiService } from '../../api.service';
import { Withdrawlist, wdStatus } from '../../common/model/withdrawlist';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-withdrawal-list',
    standalone: true,
    imports: [ClrDatagridModule, ClrLoadingModule, ClrLoadingButtonModule, FormsModule, DatePipe, ClrInputModule, ClrComboboxModule, ClarityModule],
    templateUrl: './withdrawal-list.component.html',
    styleUrl: './withdrawal-list.component.css'
})
export class WithdrawalListComponent implements OnInit {
    private apiService = inject(ApiService);
    withdrawals: Withdrawlist[] = [];
    withdrawals_filt: Withdrawlist[] = [];
    wdStatus = wdStatus;
    searchFilter: string = '';
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
            id: 9,
            name: 'Error'
        }   
    ];
    selection: { id: number; name: string } = this.statuses[0];

    constructor() {
    }

    ngOnInit(): void {
        this.getWithdrawals();
    }

    getWithdrawals() {
        this.loadingState = ClrLoadingState.LOADING;
        this.apiService.getWithdrawals(this.selection.id).subscribe(withdrawals => {
            this.withdrawals = withdrawals;
            this.withdrawals_filt = withdrawals;
            this.applySearchFilter();
            this.loadingState = ClrLoadingState.SUCCESS;
        });
    }

    applySearchFilter() {
        this.withdrawals = this.withdrawals_filt.filter(w1 => w1.fromexch.toUpperCase().includes(this.searchFilter.toUpperCase()) || w1.toexch.toUpperCase().includes(this.searchFilter.toUpperCase()) || w1.symn.toUpperCase().includes(this.searchFilter.toUpperCase()) || w1.address.toUpperCase().includes(this.searchFilter.toUpperCase()) || w1.info?.toUpperCase().includes(this.searchFilter?.toUpperCase()));
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
}
 */