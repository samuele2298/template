/* import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import '@cds/core/icon/register';
import { ClarityIcons, boltIcon, moonIcon, sunIcon, refreshIcon, barsIcon, cogIcon } from '@cds/core/icon';
import { WebsocketService } from './websocket.service';
import { TabledataService } from './tabledata.service';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ThemeToggleComponent } from './theme-toggle/theme-toggle.component';
import { AlertComponent } from './alert/alert.component';
import { ClrMainContainerModule, ClrNavigationModule, ClrIconModule, ClrDropdownModule } from '@clr/angular';
import { Subject, filter, takeUntil } from 'rxjs';
import { NgIf } from '@angular/common';
import { AuthService } from './auth.service';
import { User } from './common/model/user';
import { MonitorService } from './monitor-home/monitor.service';
import { ApiService } from './api.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: true,
    imports: [NgIf, ClrMainContainerModule, ClrNavigationModule, AlertComponent, ClrIconModule, ThemeToggleComponent, RouterLink, RouterLinkActive, RouterOutlet, ClrDropdownModule]
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'kaife';
  private websocketService = inject(WebsocketService);
  private authService = inject(AuthService);
  private tableDataService = inject(TabledataService);
  private apiService = inject(ApiService);
  monitorService = inject(MonitorService);
  stop$ = new Subject<void>();
  user?: User | null;
  nopp: number = 0;

  constructor(
  ) {
    ClarityIcons.addIcons(boltIcon, moonIcon, sunIcon, refreshIcon, barsIcon, cogIcon);
    this.authService.user.subscribe(x => this.user = x);
  }

  ngOnDestroy(): void {
    this.stopFunc();
  }

  stopFunc() {
    this.stop$.next();
    this.stop$.unsubscribe();
  }

  ngOnInit(): void {
    this.websocketService.connect();
    this.tableDataService.startTableData();
    this.listenWebsocketAlarm();
    this.listenWebsocketMess();
    this.getOpportunityCount();
  }

  listenWebsocketAlarm() {
    const alarm$ = this.websocketService.messageReceived.pipe(
      filter((mess) => mess.action === 'alarm'),
      takeUntil(this.stop$)
    );

    alarm$.subscribe(message => {
      const audio = new Audio();
      if (message.type === 'opportunity') {
        audio.src = '../../assets/_opportunity.mp3';
      }
      else if (message.type === 'timeout') {
        audio.src = '../../assets/_timeout.wav';
      }
      else if (message.type === 'positive') {
        audio.src = '../../assets/_positive.wav';
      }
      const vol = this.monitorService.getVolume(); 
      audio.volume = vol/100;
      audio.play();
    });
  }

  logout() {
    this.authService.logout().subscribe(() => {
      console.log('logout');
      this.authService.clearAuth();
    });
  }

  listenWebsocketMess() {
    const update$ = this.websocketService.messageReceived.pipe(
        filter((mess) => mess.action === 'update'),
        takeUntil(this.stop$)
    );

    update$.subscribe((message: any) => {
        this.nopp = message.nop;
        //this.getOpportunityCount();
    });
  }

  getOpportunityCount(){
    this.apiService.getOpportsAndOrders().subscribe(ops => {
        this.nopp = ops.length;
    });
  }
}
 */