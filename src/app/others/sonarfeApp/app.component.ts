import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import '@cds/core/icon/register';
import { ClarityIcons, boltIcon, moonIcon, sunIcon, refreshIcon, flaskIcon, lockIcon, usersIcon, timesIcon,  walletIcon, sliderIcon, searchIcon, radarIcon, cogIcon, lineChartIcon, userIcon } from '@cds/core/icon';
import { WebsocketService } from './websocket.service';
import { TabledataService } from './tabledata.service';
import { NavigationEnd, NavigationStart, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ThemeToggleComponent } from './theme-toggle/theme-toggle.component';
import { AlertComponent } from './components/alert/alert.component';
import { ClrMainContainerModule, ClrNavigationModule, ClrIconModule, ClrDropdownModule, ClarityModule, ClrLoadingState} from '@clr/angular';
import { Subject, catchError, filter, takeUntil, throwError, timeout, timer } from 'rxjs';
import { NgIf, CommonModule  } from '@angular/common';
import { AuthService } from './auth.service';
import { User } from './common/model/user';
import { ApiService } from './api.service';
import { RouteService } from './route.service';
import { ClrRangeModule, ClrSelectModule } from '@clr/angular';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: true,
    imports: [NgIf, ClrMainContainerModule, ClrNavigationModule, 
      ClrIconModule, RouterLink, RouterLinkActive, RouterOutlet, ClrDropdownModule,
      ClarityModule, CommonModule, ClrRangeModule, ClrSelectModule, FormsModule]
})
export class AppComponent implements OnInit, OnDestroy {

  title = 'sonarfe';
  private websocketService = inject(WebsocketService);
  private authService = inject(AuthService);
  private apiService = inject(ApiService);
  private routeService = inject(RouteService);
  private router = inject(Router);

  user?: User | null;
  private tableDataService = inject(TabledataService);
  stop$ = new Subject<void>();
  clrVerticalNavCollapsed: boolean = false; 
  isWeightsOpen: boolean = false;
  loadingState: ClrLoadingState = ClrLoadingState.DEFAULT;

  isFullScreen: boolean = false; 
  private fullScreenRoutes: string[] = ['/404']; 

  //Weights
  weights = {
    price : 33.33, // Price weight
    volu: 33.33, // Volu weight
    vol: 33.34 // Vol weight
  };

  constructor() {
    ClarityIcons.addIcons(boltIcon, moonIcon, sunIcon, refreshIcon, flaskIcon, usersIcon, walletIcon, lockIcon, timesIcon, sliderIcon, searchIcon, radarIcon,  cogIcon, lineChartIcon, userIcon);
    this.authService.user.subscribe(user => {
      this.user = user;
    });
    this.authService.status().subscribe();
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.routeService.saveRoute(this.router.url);
        this.isFullScreen = this.fullScreenRoutes.includes(this.router.url);
        //console.log(this.router.url);
      }
    });
  }

  ngOnDestroy(): void {
    this.stopFunc();
  }

  stopFunc() {
    this.stop$.next();
    this.stop$.unsubscribe();
  }

  ngOnInit(): void {
    this.loadingState = ClrLoadingState.LOADING
    this.authService.status().subscribe();
    this.tableDataService.startTableData();
    //Se trova item lo salva
    //console.log('user' + this.user? this.user: '' );
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.user = JSON.parse(storedUser); 
      //console.log('Restored user from localStorage:', this.user);
    }
    //Gestion stato pagina corrente anche dopo reload
    const route = this.routeService.loadRoute();
    if (route) {
      setTimeout(() => {
        this.router.navigate([`${route}`]);
      }, 500);
    }  
    this.weights = this.tableDataService.getWeights();
    this.loadingState = ClrLoadingState.SUCCESS;
  }

  logout() {
    this.authService.logout().subscribe(() => {
      console.log('logout');
      this.authService.clearAuth();
    });
  }

  /* signIn() {
    this.authService.login();
  } */

  clrVerticalNavCollapsedChange() {
    this.clrVerticalNavCollapsed = !this.clrVerticalNavCollapsed;
  }

  filteredResults: string[] = [];

  onSearch(event: Event): void {
    const input = (event.target as HTMLInputElement).value; 
    this.routeService.saveRoute(`/search/${input}`);
    this.router.navigate([`/search/${input}`]);
  }

  isLoading(){
    return this.loadingState == ClrLoadingState.LOADING;
  }

  saveRoute(route: string){
    this.routeService.saveRoute(route);
  }

  isPro(){
    return this.authService.isPro();
  }

  isAdmin(){
    return this.authService.isAdmin();
  }

  copyToClipboard(text: string | undefined) {
    if (text) {
      navigator.clipboard.writeText(text)
        .then(() => {
          alert('Referral code copied to clipboard!'); // Optional, can be a toast message or some other feedback
        })
        .catch(err => {
          console.error('Error copying to clipboard: ', err);
        });
    }
  }

  onWeightChange(changedKey: 'price' | 'volu' | 'vol') {
    const total = this.weights.price + this.weights.volu + this.weights.vol;

    if (total === 100) {
      return; // If already 100%, no adjustment needed
    }

    const excess = total - 100;
    const keys = Object.keys(this.weights) as Array<'price' | 'volu' | 'vol'>;

    // Adjust the other weights
    const otherKeys = keys.filter((key) => key !== changedKey);

    if (excess > 0) {
      // Reduce the excess from the other weights
      for (const key of otherKeys) {
        const reduction = excess / otherKeys.length;
        this.weights[key] = Math.max(this.weights[key] - reduction, 0);
      }
    } else {
      // Add the deficit to the other weights
      for (const key of otherKeys) {
        const addition = Math.abs(excess) / otherKeys.length;
        this.weights[key] = Math.min(this.weights[key] + addition, 100);
      }
    }

    // Ensure total is exactly 100% after adjustments
    const adjustedTotal = this.weights.price + this.weights.volu + this.weights.vol;
    if (adjustedTotal !== 100) {
      const remainingKey = keys.find((key) => key !== changedKey && this.weights[key] > 0);
      if (remainingKey) {
        this.weights[remainingKey] += 100 - adjustedTotal;
      }
    } 
  }

  confirmWeights(){
    this.tableDataService.setWeights(this.weights);
    this.isWeightsOpen = false;
    window.location.reload();
  }
}
