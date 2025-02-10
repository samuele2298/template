import { Injectable, inject } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from './common/model/user';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket: WebSocket | undefined;
  messageReceived: Subject<any> = new Subject<any>();
  private authService = inject(AuthService);
  user?: User | null;

  constructor(
  ) {
    this.authService.user.subscribe(x => this.user = x);
  }

  connect() {
    if (this.user) {
      console.log('connecting ws...');
      this.socket = new WebSocket(
        `${window.location.protocol === 'https:' ? 'wss://' : 'ws://'}${window.location.host}/ws`
      );
      this.socket.onmessage = (event) => {
        const message = JSON.parse(event.data);
        this.messageReceived.next(message);
      };
      this.socket.onopen = (event) => {
        console.log('ws open');
      };
      this.socket.onclose = () => {
        console.log('ws close');
        this.socket = undefined;
        setTimeout(() => {
          this.connect();
        }, 5000);
      };
    }
    else {
      setTimeout(() => {
        this.connect();
      }, 5000);
    }
  }
}
