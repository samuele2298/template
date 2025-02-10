import { Component, OnInit, inject } from '@angular/core';
import { ClrDatagridModule, ClrInputModule, ClrLoadingButtonModule, ClrLoadingModule, ClrLoadingState, ClrComboboxModule, ClarityModule, ClrIconModule} from '@clr/angular';
import { ApiService } from '../../api.service';
import { ClarityIcons, boltIcon, moonIcon, sunIcon, refreshIcon, flaskIcon, walletIcon, sliderIcon, radarIcon, cogIcon, lineChartIcon, userIcon } from '@cds/core/icon';
import { FormsModule } from '@angular/forms';
import { DatePipe, CommonModule } from '@angular/common';
import { Global, getSafeGlobal, getSafeGlobalList } from '../../common/model/global';
import { Tick, getSafeTick } from '../../common/model/chart';
import { SCoin, getSafeSCoin, getSafeSCoinList } from '../../common/model/coin';
import { getSafeCategory, getSafeSCategory, getSafeSCategoryList, SCategory } from '../../common/model/category';
import Chart from 'chart.js/auto';
import { formatNumber } from '../../utils';  // Import the function
import { Router } from '@angular/router';
import { TabledataService } from '../../tabledata.service';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [ClrDatagridModule, ClrLoadingModule, ClrLoadingButtonModule, FormsModule, DatePipe, 
        ClrInputModule, ClrComboboxModule, ClarityModule, CommonModule, ClrIconModule],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
    private apiService = inject(ApiService);
    private tabledataService = inject(TabledataService);
    loadingState: ClrLoadingState = ClrLoadingState.DEFAULT;
    isModalOpen: boolean = false;
    formatNumber: (value: number) => string;  
    globals: Global[] | null = [];
    chart: Tick[] = [];
    best_categories: SCategory[] = [];
    best_inv: SCoin[] = [];
    best_trd: SCoin[] = [];
    private router = inject(Router);


    /* global: Global | null = {
        total_marketcap: 1000000,
        total_crypto: 5000,
        fear_and_greed: 70,
        btc_dominance: 60,
        eth_dominance:20,
    }; 
    chart: MChart | null = {
        name: 'BTC',
        chart: [
            {
                ts: '1-1',
                value: 543,
                volume: 234,

            },
            {
                ts: '1-2',
                value: 324,
                volume: 234,

            },
            {
                ts: '1-3',
                value: 436,
                volume: 234,
            },
        ],
    };
    best_categories: SCategory[] = [
        {
            id: 1,
            name: 'L1',
            d: 2,
            score: 2,
        },
        {
            id: 2,
            name: 'BC',
            d: 4,
            score: 2.5,
        },
        {
            id: 3,
            name: 'AI',
            d: 3,
            score: 1,
        }
    ]; 
    best_inv: SCoin[] = [
        {
            id: 1,
            name: 'BTC',
            d: 2,
            score: 2,
        },
        {
            id: 2,
            name: 'ETH',
            d: 4,
            score: 2.5,
        },
        {
            id: 3,
            name: 'SOL',
            d: 3,
            score: 1,
        }
    ];  
    best_trd: SCoin[] = [
        {
            id: 1,
            name: 'BTC',
            d: 2,
            score: 2,
        },
        {
            id: 2,
            name: 'ETH',
            d: 4,
            score: 2.5,
        },
        {
            id: 3,
            name: 'SOL',
            d: 3,
            score: 1,
        }
    ]; */

    chart_price: any;
    chart_vol: any;

    constructor() {
      ClarityIcons.addIcons(boltIcon, moonIcon, sunIcon, refreshIcon, flaskIcon, walletIcon, sliderIcon,  radarIcon,  cogIcon, lineChartIcon, userIcon);
      this.formatNumber = formatNumber;  
    }

    ngOnInit(): void {
        this.getData();
    }
  
    getData(): void {
      this.loadingState = ClrLoadingState.LOADING;
      const weights = this.tabledataService.getWeights();
      this.apiService.getGlobalMetrics().subscribe(globals => {
        this.globals = getSafeGlobalList(globals);
      }); 
      this.apiService.getBestCategories().subscribe(cats => {
        this.best_categories = getSafeSCategoryList(cats);
      }); 
      this.apiService.getBestInvesting(weights).subscribe(invs => {
        this.best_inv = getSafeSCoinList(invs);
      });         
      this.apiService.getBestTrading(weights).subscribe(trds => {
        this.best_trd = getSafeSCoinList(trds);
      }); 
      this.loadingState = ClrLoadingState.SUCCESS;
    }

    createCharts(): void {
      const labels = this.chart!.map(day => this.formatDate(day.ts));
      const prices = this.chart!.map(day => day.close);
      const volumes = this.chart!.map(day => day.vol);
      this.chart_price = new Chart('chart_price', {
          type: 'line',  // Line chart
          data: {
            labels: labels,  // X-axis labels (timestamps)
            datasets: [
              {
                data: prices,  // Values dataset
                borderWidth: 4,  // Increased line width
                borderColor: '#a43cff', // Line color (white)
                backgroundColor: '#a43cff3b', // Light fill color (white with transparency)
                fill: true, // Fill under the line
                tension: 0.4, // Smooth the curve of the line
                pointRadius: 0, // Radius of the points on the line (larger points for visibility)
                pointBackgroundColor: 'rgba(255, 255, 255, 1)', // White color of the points
                pointHoverRadius: 8, // Larger points on hover for interactivity
                pointHoverBackgroundColor: 'rgba(255, 255, 255, 1)', // White background for hover effect
                cubicInterpolationMode: 'monotone', // Smooth line interpolation
              }
            ],
          },
          options: {
            responsive: true,  // Make the chart responsive to screen size
            maintainAspectRatio: true,  // Allows the chart to stretch to the parent container size
            layout: {
                  padding: { top: 20, bottom: 20, left: 0, right: 0 } // Minimal padding for a more compact layout
            },
            plugins: {
              legend: {
                display: false, // Hide the legend for a cleaner look
              },
            },
            scales: {
              x: {
                grid: {
                  display: false, // Disable the grid under the x-axis
                },
                ticks: {
                  font: {
                    size: 12,  // Slightly larger font size for better readability
                    weight: 'bold',  // Bold ticks for modern look
                  },
                  color: '#fff',  // Lighter color for ticks to match the aesthetic
                },
              },
              y: {
                grid: {
                  display: false, // Disable the grid under the y-axis
                },
                ticks: {
                  font: {
                    size: 12,  // Slightly larger font size for y-axis ticks
                    weight: 'bold', // Bold ticks for modern look
                  },
                  color: '#fff',  // Lighter color for ticks to match the aesthetic
                },
              },
            },
            elements: {
              line: {
                borderCapStyle: 'round',  // Rounded edges on the line
                borderJoinStyle: 'round',  // Rounded join between line segments
              },
            },
            animation: {
              duration: 1000,  // Smooth animation duration
            },
          },
      });
      this.chart_vol = new Chart('chart_vol', {
          type: 'line',  // Line chart
          data: {
            labels: labels,  // X-axis labels (timestamps)
            datasets: [
              {
                data: volumes,  // Values dataset
                borderWidth: 4,  // Increased line width
                borderColor: '#a43cff', // Line color (white)
                backgroundColor: '#a43cff3b', // Light fill color (white with transparency)
                fill: true, // Fill under the line
                tension: 0.4, // Smooth the curve of the line
                pointRadius: 0, // Radius of the points on the line (larger points for visibility)
                pointBackgroundColor: 'rgba(255, 255, 255, 1)', // White color of the points
                pointHoverRadius: 8, // Larger points on hover for interactivity
                pointHoverBackgroundColor: 'rgba(255, 255, 255, 1)', // White background for hover effect
                cubicInterpolationMode: 'monotone', // Smooth line interpolation
              }
            ],
          },
          options: {
            responsive: true,  // Make the chart responsive to screen size
            maintainAspectRatio: true,  // Allows the chart to stretch to the parent container size
            plugins: {
              legend: {
                display: false, // Hide the legend for a cleaner look
              },
            },
            layout: {
              padding: { top: 20, bottom: 20, left: 0, right: 0 } // Minimal padding for a more compact layout
            },
            scales: {
              x: {
                grid: {
                  display: false, // Disable the grid under the x-axis
                },
                ticks: {
                  font: {
                    size: 12,  // Slightly larger font size for better readability
                    weight: 'bold',  // Bold ticks for modern look
                  },
                  color: '#fff',  // Lighter color for ticks to match the aesthetic
                },
              },
              y: {
                grid: {
                  display: false, // Disable the grid under the y-axis
                },
                ticks: {
                  font: {
                    size: 12,  // Slightly larger font size for y-axis ticks
                    weight: 'bold', // Bold ticks for modern look
                  },
                  color: '#fff',  // Lighter color for ticks to match the aesthetic
                },
              },
            },
            elements: {
              line: {
                borderCapStyle: 'round',  // Rounded edges on the line
                borderJoinStyle: 'round',  // Rounded join between line segments
              },
            },
            animation: {
              duration: 1000,  // Smooth animation duration
            },
          },
      });
        
          

    }

    // Helper method to format a timestamp like "31-03-24"
    formatDate(ts: number): string {
      const date = new Date(ts * 1000);  // Convert timestamp if necessary
      return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear() % 100}`;
    }

    getFormattedMcap(mcap: string){
      return formatNumber(Number(mcap));
    }

    filteredResults: string[] = [];

    onSearch(input: string): void {// cerca id = search_input      
      this.router.navigate([`/search/${input}`]);
    }

    getFormatteGlobal(global: Global): string {
      if(global.name == 'tot_market_cap') 
        return formatNumber(Number(global.value));
      if(global.name == 'fear_and_greed') 
        return global.value;
      return Number(global.value).toFixed(2) + ' %';
    }
    
    navigateToCoin(coin: string) {
      this.router.navigate([`/coin/${coin}`]);
    }

    navigateToCategory(category: string) {
      this.router.navigate([`/category/${category}`]);
    }
}
