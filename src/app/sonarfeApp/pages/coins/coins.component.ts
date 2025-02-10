import { Component, OnInit, inject } from '@angular/core';
import { ClrDatagridModule, ClrInputModule, ClrLoadingButtonModule, ClrLoadingModule, ClrLoadingState, ClrComboboxModule, ClarityModule} from '@clr/angular';
import { ApiService } from '../../api.service';
import { Coin, FormCoin, getSafeLCoin, getSafeLCoinList, LCoin } from '../../common/model/coin';
import { FormsModule } from '@angular/forms';
import { DatePipe, CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { formatNumber } from '../../utils';  // Import the function
import { RouteService } from '../../route.service';
import { AuthService } from '../../auth.service';
import { TabledataService } from '../../tabledata.service';
import { Category } from '../../common/model/category';

@Component({
    selector: 'app-coins',
    standalone: true,
    imports: [ClrDatagridModule, ClrLoadingModule, ClrLoadingButtonModule, FormsModule, DatePipe, ClrInputModule, ClrComboboxModule, ClarityModule, CommonModule],
    templateUrl: './coins.component.html',
    styleUrl: './coins.component.css'
})
export class CoinsComponent implements OnInit {
    private apiService = inject(ApiService);
    private routeService = inject(RouteService);
    private router = inject(Router);
    private authService = inject(AuthService);
    private dataService = inject(TabledataService);

    formatNumber: (value: number) => string; 

    coins: LCoin[] = [];
    loadingState: ClrLoadingState = ClrLoadingState.DEFAULT;
    isCreateOpen: boolean = false; 

    selectedMetric: number = 0; 

    coin_form: FormCoin = {
        name: '',
        ticker: '',
        source: '',
        category: ''
    };

    constructor() {
        this.formatNumber = formatNumber; 
    }

    ngOnInit(): void {
        this.getCoins();

    }

    getCoins() {
        this.loadingState = ClrLoadingState.LOADING;
        this.apiService.getCoinList().subscribe(coins => {
            this.coins = getSafeLCoinList(coins);
            this.loadingState = ClrLoadingState.SUCCESS;
        }); 
 
    }

    addCoin() {
        if (this.coin_form.name != '' &&  this.coin_form.ticker != '' && this.coin_form.source != '' ) {
            this.loadingState = ClrLoadingState.LOADING;   
            this.apiService.addCoin(this.coin_form).subscribe(() => {
                this.isCreateOpen = false; 
                this.getCoins();
            }); 
        } else {
          console.log("Coin need to have all the params");
          this.isCreateOpen = false; 
        }
    }

    navigateToCoin(coin: string) {
        this.routeService.saveRoute(`/coin/${coin}`);
        this.router.navigate([`/coin/${coin}`]);
    }

    isAdmin(){
        return this.authService.isAdmin();
    }

    getCategories(): Category[] {
        return this.dataService.getCategories();
    }

    selectCategory(cat :string): void{
        this.coin_form.category = cat;
    }

    giveMetric(coin: LCoin, n: number): string {
        switch (n) {
            case 1:
                return this.selectedMetric === 0 ? coin.f.toFixed(2)  : this.selectedMetric === 1 ? coin.f_volu.toFixed(2) : coin.f_vol.toFixed(2) 
            case 2:
                return this.selectedMetric === 0 ? coin.s.toFixed(2)  : this.selectedMetric === 1 ? coin.s_volu.toFixed(2)  : coin.s_vol.toFixed(2) 
            case 3:
                return this.selectedMetric === 0 ? coin.t.toFixed(2)  : this.selectedMetric === 1 ? coin.t_volu.toFixed(2)  : coin.t_vol.toFixed(2) 
            case 4:
                return this.selectedMetric === 0 ? coin.d.toFixed(2)  : this.selectedMetric === 1 ? coin.d_volu.toFixed(2) : coin.d_vol.toFixed(2) 
            case 5:
                return this.selectedMetric === 0 ? coin.w.toFixed(2)  : this.selectedMetric === 1 ? coin.w_volu.toFixed(2)  : coin.w_vol.toFixed(2) 
            default:
                return this.selectedMetric === 0 ? coin.m.toFixed(2)  : this.selectedMetric === 1 ? coin.m_volu.toFixed(2)  : coin.m_vol.toFixed(2) 
        }
    }

    number(value: string): number {
        return Number(value);
    }
}

