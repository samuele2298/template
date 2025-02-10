import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { BalanceListComponent } from './balance-list/balance-list.component';
import { CommandComponent } from './command/command.component';
import { ExchangeFormComponent } from './exchange-home/exchange-form/exchange-form.component';
import { ExchangeHomeComponent } from './exchange-home/exchange-home.component';
import { ExchangeListComponent } from './exchange-home/exchange-list/exchange-list.component';
import { LogsComponent } from './logs/logs.component';
import { OpHistoryComponent } from './op-history/op-history.component';
import { OpportunityComponent } from './opportunity/opportunity.component';
import { PairFormComponent } from './pair-home/pair-form/pair-form.component';
import { PairHomeComponent } from './pair-home/pair-home.component';
import { PairListComponent } from './pair-home/pair-list/pair-list.component';
import { SettingComponent } from './setting/setting.component';
import { SymbolFormComponent } from './symbol-home/symbol-form/symbol-form.component';
import { SymbolHomeComponent } from './symbol-home/symbol-home.component';
import { SymbolListComponent } from './symbol-home/symbol-list/symbol-list.component';
import { ChainFormComponent } from './chain-home/chain-form/chain-form.component';
import { ChainHomeComponent } from './chain-home/chain-home.component';
import { ChainListComponent } from './chain-home/chain-list/chain-list.component';
import { SymrefFormComponent } from './symref-home/symref-form/symref-form.component';
import { SymrefHomeComponent } from './symref-home/symref-home.component';
import { SymrefListComponent } from './symref-home/symref-list/symref-list.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from './auth.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MonitorHomeComponent } from './monitor-home/monitor-home.component';
import { BalmonitorComponent } from './monitor-home/balmonitor/balmonitor.component';
import { WithdrawalListComponent } from './withdrawal-list/withdrawal-list.component';
import { ChainrefHomeComponent } from './chainref-home/chainref-home.component';
import { ChainrefListComponent } from './chainref-home/chainref-list/chainref-list.component';
import { ChainrefFormComponent } from './chainref-home/chainref-form/chainref-form.component';

export const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent,
        canActivate: [authGuard]
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'opportunity',
        component: OpportunityComponent,
        pathMatch: 'full',
        canActivate: [authGuard]
    },
    {
        path: '',
        component: OpportunityComponent,
        pathMatch: 'full',
        canActivate: [authGuard]
    },
    {
        path: 'history',
        component: OpHistoryComponent,
        pathMatch: 'full',
        canActivate: [authGuard]
    },
    {
        path: 'pair-list',
        component: PairHomeComponent,
        canActivate: [authGuard],
        children: [
            {
                path: '',
                component: PairListComponent
            },
            {
                path: 'edit/:id',
                component: PairFormComponent
            },
            {
                path: 'add',
                component: PairFormComponent
            }
        ]
    },
    {
        path: 'symbol-list',
        component: SymbolHomeComponent,
        canActivate: [authGuard],
        children: [
            {
                path: '',
                component: SymbolListComponent
            },
            {
                path: 'edit/:id',
                component: SymbolFormComponent
            },
            {
                path: 'add',
                component: SymbolFormComponent
            }
        ]
    },
    {
        path: 'symref-list',
        component: SymrefHomeComponent,
        canActivate: [authGuard],
        children: [
            {
                path: '',
                component: SymrefListComponent
            },
            {
                path: 'edit/:id',
                component: SymrefFormComponent
            },
            {
                path: 'add',
                component: SymrefFormComponent
            }
        ]
    },
    {
        path: 'chain-list',
        component: ChainHomeComponent,
        canActivate: [authGuard],
        children: [
            {
                path: '',
                component: ChainListComponent
            },
            {
                path: 'edit/:id',
                component: ChainFormComponent
            },
            {
                path: 'add',
                component: ChainFormComponent
            }
        ]
    },
    {
        path: 'chainref-list',
        component: ChainrefHomeComponent,
        canActivate: [authGuard],
        children: [
            {
                path: '',
                component: ChainrefListComponent
            },
            {
                path: 'edit/:id',
                component: ChainrefFormComponent
            },
            {
                path: 'add',
                component: ChainrefFormComponent
            }
        ]
    },
    {
        path: 'exchange-list',
        component: ExchangeHomeComponent,
        canActivate: [authGuard],
        children: [
            {
                path: '',
                component: ExchangeListComponent
            },
            {
                path: 'edit/:id',
                component: ExchangeFormComponent
            },
            {
                path: 'add',
                component: ExchangeFormComponent
            }
        ]
    },
    {
        path: 'modify-exchange',
        component: ExchangeFormComponent,
        canActivate: [authGuard]
    },
    {
        path: 'balance-list',
        component: BalanceListComponent,
        pathMatch: 'full',
        canActivate: [authGuard]
    },
    {
        path: 'withdrawal-list',
        component: WithdrawalListComponent,
        pathMatch: 'full',
        canActivate: [authGuard]
    },
    {
        path: 'statistics',
        component: StatisticsComponent,
        canActivate: [authGuard]
    },
    {
        path: 'logs',
        component: LogsComponent,
        pathMatch: 'full',
        canActivate: [authGuard]
    },
    {
        path: 'command',
        component: CommandComponent,
        pathMatch: 'full',
        canActivate: [authGuard]
    },
    {
        path: 'settings',
        component: SettingComponent,
        pathMatch: 'full',
        canActivate: [authGuard]
    },
    {
        path: 'monitor',
        component: MonitorHomeComponent,
        canActivate: [authGuard],
        children: [
            {
                path: '',
                component: BalmonitorComponent
            }
        ]
    },
    {
        path: '**',
        component: PageNotFoundComponent
    }

];
