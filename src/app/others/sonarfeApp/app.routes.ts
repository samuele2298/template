import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { TradingComponent } from './pages/trading/trading.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { CategoryComponent } from './pages/category/category.component';
import { CoinsComponent } from './pages/coins/coins.component'; 
import { PricingComponents } from './pages/pricing/pricing.component'; 
import { UsersComponents } from './pages/users/users.component'; 
import { CoinComponent } from './pages/coin/coin.component'; 
import { authGuard } from './auth.guard';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { SearchComponent } from './pages/search/search.component';
import { GemsComponent } from './pages/gems/gems.component';

export const routes: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent,
        //canActivate: [authGuard]
    },
    {
        path: 'trading',
        component: TradingComponent,
        //canActivate: [authGuard]
    },
    {
        path: 'gems',
        component: GemsComponent,
        //canActivate: [authGuard]
    },
    {
        path: 'categories',
        component: CategoriesComponent,
        //canActivate: [authGuard]
    },
    {
        path: 'coins',
        component: CoinsComponent,
        //canActivate: [authGuard]
    },
    {
        path: 'category/:name',
        component: CategoryComponent,
        //canActivate: [authGuard]
    },
    {
        path: 'coin/:name',
        component: CoinComponent,
        //canActivate: [authGuard]
    },
    {
        path: 'pricing',
        component: PricingComponents,
        //canActivate: [authGuard]
    },
    {
        path: 'users',
        component: UsersComponents,
        //canActivate: [authGuard]
    },
    {
        path: 'search/:filter',
        component: SearchComponent,
        //canActivate: [authGuard]
    },
    {
        path: '404',
        component: PageNotFoundComponent
    }
];
