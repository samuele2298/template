import { Component, OnInit, inject } from '@angular/core';
import { ClrDatagridModule, ClrInputModule, ClrLoadingButtonModule, ClrLoadingModule, ClrLoadingState, ClrComboboxModule, ClarityModule} from '@clr/angular';
import { ApiService } from '../../api.service';
import { Category, getSafeCategory, defaultCategory } from '../../common/model/category';
import { FormsModule } from '@angular/forms';
import { DatePipe, CommonModule } from '@angular/common';
import { CoinRef, LCoin, getSafeLCoin, getSafeCoinRefList } from '../../common/model/coin';
import { ActivatedRoute, Router } from '@angular/router';
import { formatNumber } from '../../utils';  // Import the function
import { AuthService } from '../../auth.service';
import { TabledataService } from '../../tabledata.service';

@Component({
    selector: 'app-category',
    standalone: true,
    imports: [ClrDatagridModule, ClrLoadingModule, ClrLoadingButtonModule, FormsModule, DatePipe, ClrInputModule, ClrComboboxModule, ClarityModule, CommonModule],
    templateUrl: './category.component.html',
    styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit {
    private apiService = inject(ApiService);
    private route = inject(ActivatedRoute);
    private router = inject(Router);
    private tabledataService = inject(TabledataService);
    private authService = inject(AuthService);
    formatNumber: (value: number) => string;  // Declare the formatNumber function as a property of the class

    category: Category = defaultCategory;
    coins: LCoin[] = [];
    coinRefs: CoinRef[] = [];
    categoryRename: string = ''; 

    loadingState: ClrLoadingState = ClrLoadingState.DEFAULT;
    
    isUpdateOpen: boolean = false;
    isDeleteOpen: boolean = false;
    isRenameOpen: boolean = false;
    isDuplicateOpen: boolean = false;
    isClearOpen: boolean = false;

    selectedCoins: number[] = []; // Holds the IDs of selected coins

    name: string | null = '';

    selectedMetric: number = 0; 

    //POP UP ADD COINS
    filteredCoins: CoinRef[] = []; // Clone the array
    searchTerm: string = '';

    constructor() {
        this.formatNumber = formatNumber;  
    }

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            this.name = params.get('name');
            if (!this.name || this.name === '') {
                console.error("ID non valido o mancante.");
                this.loadingState = ClrLoadingState.ERROR;
                this.router.navigate(['/404']); 
            } else {
                this.getCategory();
                this.updateFilteredCoins();
                console.log('this.name '+ this.name);
            }
        });
    }

    getCategory() {
        this.loadingState = ClrLoadingState.LOADING; 
        const weights = this.tabledataService.getWeights();  
        this.apiService.getCategory(this.name!).subscribe(result => {
            for(const coin of result.coins){
                coin.trd_score = (coin.trd_price_score * (weights.price /100)) +  
                    (coin.trd_volu_score * (weights.volu /100)) + 
                    (coin.trd_vol_score * (weights.vol /100));
                coin.inv_score = (coin.inv_price_score * (weights.price /100)) +  
                    (coin.inv_volu_score * (weights.volu /100)) + 
                    (coin.inv_vol_score * (weights.vol /100));
                this.coins.push(getSafeLCoin(coin));
            }
            this.category = getSafeCategory(result.category!);
            this.categoryRename = this.category.name;
            this.getCoinsRef();
            this.loadingState = ClrLoadingState.SUCCESS;
        }); 
    }

    getCoinsRef() {
        this.loadingState = ClrLoadingState.LOADING;   
        this.apiService.getCategoryCoinsRef(this.category.id).subscribe(coin_refs => {
            this.coinRefs = getSafeCoinRefList(coin_refs); 
            this.filteredCoins = this.coinRefs; 
            this.loadingState = ClrLoadingState.SUCCESS;
        },   
        error => {
            console.error('Error getCoinsRef:', error);
            this.loadingState = ClrLoadingState.ERROR;
        });  
    }

    delCategory() {
        this.loadingState = ClrLoadingState.LOADING;   
        this.apiService.delCategory(this.category.id).subscribe(result => {
            this.isDeleteOpen = false;
            this.loadingState = ClrLoadingState.SUCCESS;
            this.router.navigate([`/categories`]);
        }); 
    }

    clearCategory() {
        this.loadingState = ClrLoadingState.LOADING;   
        this.apiService.clearCategory(this.category.id).subscribe(result => {
            this.isClearOpen = false;
            this.category = defaultCategory;
            this.coins = [];
            this.coinRefs = [];
            this.getCategory();
            this.loadingState = ClrLoadingState.SUCCESS;
        }); 
    }

    addCoins(coins: number[]) {
        if(coins.length === 0) return; 
        this.loadingState = ClrLoadingState.LOADING;  
        this.apiService.addCoinCategory(this.category.id, coins).subscribe(result => {
            this.isUpdateOpen = false;
            this.category = defaultCategory;
            this.coins = [];
            this.coinRefs = [];
            this.getCategory();
            this.loadingState = ClrLoadingState.SUCCESS;
        }); 
    }

    removeCoin(coinId: number) {
        this.loadingState = ClrLoadingState.LOADING;   
        this.apiService.removeCoinCategory(this.category.id, coinId).subscribe(result => {
            this.category = defaultCategory;
            this.coins = [];
            this.coinRefs = [];
            this.getCategory();
            this.loadingState = ClrLoadingState.SUCCESS;
        }); 
    }

    isSelected(id: number): boolean {
        return this.selectedCoins.includes(id);
    }

    updateFilteredCoins() {
        this.filteredCoins = this.coinRefs.filter((coin) => 
            coin.name.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
    }

    toggleSelection(id: number) {
        if (this.isSelected(id)) {
          this.selectedCoins = this.selectedCoins.filter(coinId => coinId !== id);
        } else {
          this.selectedCoins.push(id);
        }
    }

    confirmSelection() {
        this.addCoins(this.selectedCoins);
        this.isUpdateOpen = false; // Close modal after action
    }

    isLoading() {
        return this.loadingState != ClrLoadingState.SUCCESS;
    }

    navigateToCoin(coin: string) {
        this.router.navigate([`/coin/${coin}`]);
    }

    isPro(){
        return this.authService.isPro();
    }

    isAdmin(){
        return this.authService.isAdmin();
    }

    goBack(){
        this.router.navigate(['/categories']); 
    }

    rename() {
        this.loadingState = ClrLoadingState.LOADING;   
        this.apiService.renameCategory(this.category.id, this.categoryRename).subscribe(result => {
            this.isRenameOpen = false;
            this.category = defaultCategory;
            this.coins = [];
            this.coinRefs = [];
            this.loadingState = ClrLoadingState.SUCCESS;
            this.router.navigate([`/category/${this.categoryRename}`]); 
            this.categoryRename = '';
        }); 
    }

    duplicate() {
        this.loadingState = ClrLoadingState.LOADING;   
        this.apiService.duplicateCategory(this.category.id, this.categoryRename).subscribe(result => {
            this.isDuplicateOpen = false;
            this.category = defaultCategory;
            this.coins = [];
            this.coinRefs = [];
            this.loadingState = ClrLoadingState.SUCCESS;
            this.router.navigate([`/categories`]); 
            this.categoryRename = '';
        }); 
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

    giveCatMetric(cat: Category, n: number): string {
        switch (n) {
          case 1:
              return this.selectedMetric === 0 ? cat.f!.toFixed(2)  : this.selectedMetric === 1 ? cat.f_volu!.toFixed(2) : cat.f_vol!.toFixed(2) 
          case 2:
              return this.selectedMetric === 0 ? cat.s!.toFixed(2)  : this.selectedMetric === 1 ? cat.s_volu!.toFixed(2)  : cat.s_vol!.toFixed(2) 
          case 3:
              return this.selectedMetric === 0 ? cat.t!.toFixed(2)  : this.selectedMetric === 1 ? cat.t_volu!.toFixed(2)  : cat.t_vol!.toFixed(2) 
          case 4:
              return this.selectedMetric === 0 ? cat.d!.toFixed(2)  : this.selectedMetric === 1 ? cat.d_volu!.toFixed(2) : cat.d_vol!.toFixed(2) 
          case 5:
              return this.selectedMetric === 0 ? cat.w!.toFixed(2)  : this.selectedMetric === 1 ? cat.w_volu!.toFixed(2)  : cat.w_vol!.toFixed(2) 
          default:
              return this.selectedMetric === 0 ? cat.m!.toFixed(2)  : this.selectedMetric === 1 ? cat.m_volu!.toFixed(2)  : cat.m_vol!.toFixed(2) 
        } 
    }

    number(value: string): number {
        return Number(value);
    }
}
