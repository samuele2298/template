import { Component, OnInit, inject } from '@angular/core';
import { ClrDatagridModule, ClrInputModule, ClrLoadingButtonModule, ClrLoadingModule, ClrLoadingState, ClrComboboxModule, ClarityModule} from '@clr/angular';
import { ApiService } from '../../api.service';
import { GCoin, getSafeGCoin, } from '../../common/model/coin';
import { FormsModule } from '@angular/forms';
import { DatePipe, CommonModule } from '@angular/common';
import { formatNumber } from '../../utils';  // Import the function
import { TabledataService } from '../../tabledata.service';
import { Category, defaultCategory, getSafeCategoryList } from '../../common/model/category';
import { RouteService } from '../../route.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-gems',
    standalone: true,
    imports: [ClrDatagridModule, ClrLoadingModule, ClrLoadingButtonModule, FormsModule, DatePipe, ClrInputModule, ClrComboboxModule, ClarityModule, CommonModule],
    templateUrl: './gems.component.html',
    styleUrl: './gems.component.css'
})
export class GemsComponent implements OnInit {
    private apiService = inject(ApiService);
    private tabledataService = inject(TabledataService);
    private routeService = inject(RouteService);
    private router = inject(Router);

    formatNumber: (value: number) => string; 

    coins: GCoin[] = [];
    categories: Category[] = [];
    selected_category: Category = defaultCategory;
    filtered_coins: GCoin[] = [];
    filter_search: string = '';
    loadingState: ClrLoadingState = ClrLoadingState.DEFAULT;

    minMcap: number = 0;
    minMcaps: number[] = [ 0, 100000, 1000000, 5000000, 1000000000, 10000000000];
    maxMcap: number = 0;
    maxMcaps: number[] = [ 0, 1000000, 10000000, 50000000, 10000000000, 100000000000];
    minInvScore: number = 999;
    minInvScores: number[]  = [ 999,-10,-1, 0, 1, 10 ];
    maxInvScore: number = 999;
    maxInvScores: number[]  = [ 999,-10,-1, 0, 1, 10 ];
    minTrdScore: number = 999;
    minTrdScores: number[]  = [ 999,-10,-1, 0, 1, 10 ];
    maxTrdScore: number = 999;
    maxTrdScores: number[]  = [ 999,-10,-1, 0, 1, 10 ];

    constructor() {
        this.formatNumber = formatNumber; 
    }

    ngOnInit(): void {
        this.getCoins();
    }

    getCoins(): void {
        this.loadingState = ClrLoadingState.LOADING;
        const weights = this.tabledataService.getWeights();  
        this.apiService.getGemList().subscribe(coins => {
            for(const coin of coins){
                coin.trd_score = (coin.trd_price_score * (weights.price /100)) +  
                    (coin.trd_volu_score * (weights.volu /100)) + 
                    (coin.trd_vol_score * (weights.vol /100));
                coin.inv_score = (coin.inv_price_score * (weights.price /100)) +  
                    (coin.inv_volu_score * (weights.volu /100)) + 
                    (coin.inv_vol_score * (weights.vol /100));
                this.coins.push(getSafeGCoin(coin));
            }
            this.apiService.getCategoryList().subscribe(categories => {
                this.categories = getSafeCategoryList(categories).sort((a, b) => 
                    a.name.localeCompare(b.name)
                );                
                for(const cat of categories){
                    if (cat.id === 0)
                        this.selected_category = cat
                }
                this.filtered_coins = this.coins;
                this.filterResult();
                this.loadingState = ClrLoadingState.SUCCESS;
            });
        });
    }

    filterResult(): void {
        this.filtered_coins = this.coins.filter(coin => {
            // Filter by search string
            const matchesSearch = !this.filter_search || 
                coin.name.toLowerCase().includes(this.filter_search.toLowerCase());
    
            // Filter by selected category
            const matchesCategory = this.selected_category===defaultCategory || 
                coin.category === this.selected_category.name;
    
            // Filter by minimum market cap
            const matchesMinMcap = this.minMcap===0 || 
                coin.mcap >= this.minMcap;
    
            // Filter by maximum market cap
            const matchesMaxMcap = this.maxMcap===0 || 
                coin.mcap <= this.maxMcap;
    
            // Filter by minimum investment score
            const matchesMinInvScore = this.minInvScore===999 || 
                coin.inv_score >= this.minInvScore;
    
            // Filter by maximum investment score
            const matchesMaxInvScore = this.maxInvScore===999 || 
                coin.inv_score <= this.maxInvScore;
    
            // Filter by minimum trading score
            const matchesMinTrdScore = this.minTrdScore===999 || 
                coin.trd_score >= this.minTrdScore;

            // Filter by maximum trading score
            const matchesMaxTrdScore = this.maxTrdScore===999 || 
                coin.trd_score <= this.maxTrdScore;
    
            // Combine all filter conditions
            return (
                matchesSearch &&
                matchesCategory &&
                matchesMinMcap &&
                matchesMaxMcap &&
                matchesMinInvScore &&
                matchesMaxInvScore &&
                matchesMinTrdScore &&
                matchesMaxTrdScore
            );
        });
    }

    onSearch(event: Event): void {
        this.filter_search = (event.target as HTMLInputElement).value; 
        this.filterResult();
    }

    navigateToCoin(coin: string) {
        this.routeService.saveRoute(`/coin/${coin}`);
        this.router.navigate([`/coin/${coin}`]);
    }

    navigateToCategory(category: string) {
        this.routeService.saveRoute(`/category/${category}`);
        this.router.navigate([`/category/${category}`]);
    }

    reset(){
        this.filter_search = '';
        for(const cat of this.categories){
            if (cat.id === 0)
                this.selected_category = cat
        }
        this.filtered_coins =  this.coins.filter(coin => coin.category && this.selected_category.name && coin.category === this.selected_category.name);
        this.minMcap = 0;
        this.maxMcap = 0;
        this.minInvScore = 999;
        this.minTrdScore = 999;
        this.maxTrdScore = 999;
        this.maxInvScore = 999;
    }

    filtersHidden = false;

    showFilters() {
      this.filtersHidden = !this.filtersHidden;
    }

    getNumberFormat(value: number): string{
        if (value === 999) {
            return 'None';
        } else {
            return `${value}`;
        }
    }


    getNumberFormatMcap(value: number): string{
        if (value === 0) {
            return 'None';
        } else if (value >= 1_000_000_000) {
            return `$ ${(value / 1_000_000_000).toFixed(0)}B`;
        } else if (value >= 1_000_000) {
            return `$ ${(value / 1_000_000).toFixed(0)}M`;
        } else if (value >= 1_000) {
            return `$ ${(value / 1_000).toFixed(0)}K`;
        } else {
            return `$ ${value}`;
        }
    }
    
}

