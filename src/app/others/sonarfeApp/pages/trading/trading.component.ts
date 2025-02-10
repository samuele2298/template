import { Component, Inject, OnInit, inject } from '@angular/core';
import { ClrDatagridModule, ClrInputModule, ClrLoadingButtonModule, ClrLoadingModule, ClrLoadingState, ClrComboboxModule, ClarityModule} from '@clr/angular';
import { ApiService } from '../../api.service';
import { FormsModule } from '@angular/forms';
import { DatePipe , CommonModule} from '@angular/common';
import { Bias, getSafeBias, getSafeBiasList } from '../../common/model/bias';
import { SCoin, getSafeSCoin, getSafeSCoinList } from '../../common/model/coin';
import { Router } from '@angular/router';
import { formatNumber } from '../../utils';  // Import the function
import { TabledataService } from '../../tabledata.service';

@Component({
    selector: 'app-trading',
    standalone: true,
    imports: [ClrDatagridModule, ClrLoadingModule, ClrLoadingButtonModule, FormsModule, DatePipe, ClrInputModule, ClrComboboxModule, ClarityModule, CommonModule],
    templateUrl: './trading.component.html',
    styleUrl: './trading.component.css'
})
export class TradingComponent implements OnInit {
    private tabledataService = inject(TabledataService);
    private apiService = inject(ApiService);
    private router = inject(Router);
    loadingState: ClrLoadingState = ClrLoadingState.DEFAULT;
    isModalOpen: boolean = false;
    formatNumber: (value: number) => string;  

    bias: Bias[] = [];
    best: SCoin[] = [];
    worst: SCoin[] = [];

    constructor() {
      this.formatNumber = formatNumber;  
    }

    ngOnInit(): void {
        this.getData();
    }
  
    getData(): void {
        this.loadingState = ClrLoadingState.LOADING;
        const weights = this.tabledataService.getWeights();
        this.apiService.getBias().subscribe(biass => {
          this.bias = getSafeBiasList(biass);
        }); 
        this.apiService.getBest(weights).subscribe(bests => {
          this.best = getSafeSCoinList(bests);
        }); 
        this.apiService.getWorst(weights).subscribe(worsts => {
          this.worst = getSafeSCoinList(worsts);
        });         
        this.loadingState = ClrLoadingState.SUCCESS;
    }

    navigateToCoin(coin: string) {
      this.router.navigate([`/coin/${coin}`]);
    }

    Number(n: string): number {
      return Number(n);
    }


}
