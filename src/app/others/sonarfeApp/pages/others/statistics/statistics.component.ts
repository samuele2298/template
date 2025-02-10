/* import { Component, OnInit, inject} from '@angular/core';
import { ClrDatagridModule, ClrInputModule, ClrLoadingButtonModule, ClrLoadingModule, ClrLoadingState } from '@clr/angular';
import { ApiService } from '../../api.service';
import { DatePipe } from '@angular/common';
import { Statistic } from '../../common/model/statistic';
//import { Chart, registerables } from 'chart.js';

 
@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css'],
  standalone: true,
  imports: [ClrDatagridModule, ClrLoadingModule, ClrLoadingButtonModule, DatePipe, ClrInputModule],
})
export class StatisticsComponent implements OnInit {
  //@ViewChild('returns', { static: true }) returns!: ElementRef;
  //@ViewChild('equity', { static: true }) equity!: ElementRef;

  private apiService = inject(ApiService);
  statistics: Statistic[] = [];
  //statistics_filt: Statistic[] = [];
  //searchFilter: string = '';
  loadingState: ClrLoadingState = ClrLoadingState.DEFAULT;
  account_value: number = 0;

  /*
  lastNDaysReturns: number = 50;
  lastNDaysEquity: number = 50;

  //Summary
  //Day
  day_usdt: number = 0;
  day_perc: number = 0;

  //Week
  week_usdt: number = 0;
  week_perc: number = 0;

  //Month
  month_usdt: number = 0;
  month_perc: number = 0;

  //Year
  year_usdt: number = 0;
  year_perc: number = 0;

  constructor() { }

  ngOnInit(): void {
    this.initialize();
  }

  initialize() {
      this.loadingState = ClrLoadingState.LOADING;
      this.apiService.getAccountValue().subscribe(response => {
        this.account_value = response.total_value;
      });
      this.apiService.getStatistics().subscribe(statistics => {
          this.statistics = statistics;
          //this.statistics_filt = statistics_filt;
          //this.applySearchFilter();
          this.loadingState = ClrLoadingState.SUCCESS;
          /* this.calculateSummary();
          this.launchReturnsCharts();
          this.launchEquityCharts(); 
      });
  }

  /*   applySearchFilter() {
      this.statistics = this.statistics_filt.filter(w1 => w1.fromexch.toUpperCase()
      .includes(this.searchFilter.toUpperCase()) || w1.toexch.toUpperCase()
      .includes(this.searchFilter.toUpperCase()) || w1.symn.toUpperCase()
      .includes(this.searchFilter.toUpperCase()) || w1.address.toUpperCase()
      .includes(this.searchFilter.toUpperCase()) || w1.info?.toUpperCase()
      .includes(this.searchFilter?.toUpperCase()));
  }
  */

  /* calculateSummary() {
    let today = new Date();
    
    // Last Day
    let yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    
    // Last Week
    let weekStart = new Date(today);
    weekStart.setDate(today.getDate() - today.getDay() - 7);
    weekStart.setHours(0, 0, 0, 0); 

    // Last Month
    let monthStart = new Date(today);
    monthStart.setDate(today.getDate() - today.getDay() - 30);
    monthStart.setHours(0, 0, 0, 0); 
    
    // Last Year
    let yearStart = new Date(today);
    yearStart.setDate(today.getDate() - today.getDay() - 365);
    yearStart.setHours(0, 0, 0, 0);
    
    // Initialize variables
    let startAccountValueDay = null;
    let startAccountValueWeek = null;
    let startAccountValueMonth = null;
    let startAccountValueYear = null;

    this.day_usdt = 0;
    this.week_usdt = 0;
    this.month_usdt = 0;
    this.year_usdt = 0;

    // Loop through statistics and aggregate
    for (const perf of this.statistics) {
        let perfDate = new Date(perf.date);
        let accountValue = perf.account_value;

        // Last Day
        if (this.isSameDay(perfDate, yesterday)) {
            this.day_usdt += perf.profit_usdt;
            if (startAccountValueDay === null) {
                startAccountValueDay = accountValue;
            }
        }

        // Last Week
        if (this.isInSameWeek(perfDate, weekStart, today)) {
            this.week_usdt += perf.profit_usdt;
            if (startAccountValueWeek === null) {
                startAccountValueWeek = accountValue;
            }
        }

        // Last Month
        if (this.isInSameMonth(perfDate, monthStart, today)) {
            this.month_usdt += perf.profit_usdt;
            if (startAccountValueMonth === null) {
                startAccountValueMonth = accountValue;
            }
        }

        // Last Year
        if (this.isInSameYear(perfDate, yearStart, today)) {
            this.year_usdt += perf.profit_usdt;
            if (startAccountValueYear === null) {
                startAccountValueYear = accountValue;
            }
        }
    }

    // Calculate percentages based on the start of each period
    this.day_perc = startAccountValueDay ? (this.day_usdt / startAccountValueDay) * 100 : 0;
    this.week_perc = startAccountValueWeek ? (this.week_usdt / startAccountValueWeek) * 100 : 0;
    this.month_perc = startAccountValueMonth ? (this.month_usdt / startAccountValueMonth) * 100 : 0;
    this.year_perc = startAccountValueYear ? (this.year_usdt / startAccountValueYear) * 100 : 0;
  }
 */
  // Helper methods
  /* private isSameDay(date1: Date, date2: Date): boolean {
      return date1.toDateString() === date2.toDateString();
  }

  private isInSameWeek(date: Date, weekStart: Date, today: Date): boolean {
      let end = new Date(weekStart);
      end.setDate(end.getDate() + 6); // End of the week
      return date >= weekStart && date <= end;
  }

  private isInSameMonth(date: Date, monthStart: Date, today: Date): boolean {
    let end = new Date(monthStart);
    end.setDate(end.getDate() + 30); // End of the week
    return date >= monthStart && date <= end;
  } 

  private isInSameYear(date: Date, yearStart: Date, today: Date): boolean {
    let end = new Date(yearStart);
    end.setDate(end.getDate() + 365); // End of the week
    return date >= yearStart && date <= end;
  }  

  /////////////////////////////////
  //CHART.JS
  launchReturnsCharts(): void {
    Chart.register(...registerables); 

    //prepare data

    const labels: string[] = [];
    const datas: number[] = [];

    // Sort statistics by date
    this.statistics.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
  
      // Check if the dates are valid
      if (isNaN(dateA.getTime())) return 1; // Treat invalid dates as later
      if (isNaN(dateB.getTime())) return -1; // Treat invalid dates as earlier
  
      // Compare dates
      return dateB.getTime() - dateA.getTime();
    });

    // Get today's date and date 50 days ago
    const today = new Date();
    const pastDate = new Date();
    pastDate.setDate(today.getDate() - this.lastNDaysReturns);

    // Filter statistics to include only the last 50 days
    const recentStatistics = this.stats.filter(p => new Date(p.date) >= pastDate);

    // Prepare labels and data
    for (let p of recentStatistics) {
        labels.push(p.date.toString().split('T')[0]);
        datas.push(p.profit_usdt);
    }


    //charts
    new Chart(this.returns.nativeElement, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          data: datas,
          backgroundColor: 'rgb(255, 255, 255)',
          borderWidth: 2,
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                let label = context.dataset.label || '';
                if (label) {
                  label += ': ';
                }
                if (context.parsed.y !== null) {
                  label += `${context.parsed.y}`;
                }
                return label;
              }
            }
          }
        },
        scales: {
          x: {
            stacked: true
          },
          y: {
            stacked: true
          }
        }
      }
    })
  }

  launchEquityCharts(): void {
    Chart.register(...registerables); 

    //prepare data
    const labels: string[] = [];
    const datas: number[] = [];

    // Sort statistics by date
    this.stats.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
  
      // Check if the dates are valid
      if (isNaN(dateA.getTime())) return 1; // Treat invalid dates as later
      if (isNaN(dateB.getTime())) return -1; // Treat invalid dates as earlier
  
      // Compare dates
      return dateB.getTime() - dateA.getTime();
    });

    // Get today's date and date 50 days ago
    const today = new Date();
    const pastDate = new Date();
    pastDate.setDate(today.getDate() - this.lastNDaysEquity);

    // Filter statistics to include only the last 50 days
    const recentStatistics = this.stats.filter(p => new Date(p.date) >= pastDate);

    // Prepare labels and data
    for (let p of recentStatistics) {
        labels.push(p.date.toString().split('T')[0]);
        datas.push(p.account_value);
    }


    //charts
    new Chart(this.equity.nativeElement, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          data: datas,
          backgroundColor: 'rgb(255, 255, 255)',
          borderColor: 'rgb(255, 255, 255)',
          borderWidth: 5,
          fill: false,
          tension: 0.1,
          pointRadius: 1,
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                let label = context.dataset.label || '';
                if (label) {
                  label += ': ';
                }
                if (context.parsed.y !== null) {
                  label += `${context.parsed.y}`;
                }
                return label;
              }
            }
          }
        },
        scales: {
          x: {
            stacked: true
          },
          y: {
            stacked: true
          }
        }
      }
    })
  }

  formatNumber(value: number | null): string {
    if (value === null || value === undefined) {
      return '0.00'; 
    }
    const fixedValue = Number(value).toFixed(2);
    return `${fixedValue}`;
  }
}
 */