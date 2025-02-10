import { Injectable } from '@angular/core';
import { Alert } from './common/model/alert';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: Alert[] = [];

  constructor() { }

  add(message: Alert) {
    this.messages.push(message);
  }

  clear() {
    this.messages = [];
  }
}
