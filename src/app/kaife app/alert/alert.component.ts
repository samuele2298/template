import { Component, OnInit, inject } from '@angular/core';
import { MessageService } from '../message.service';
import { Alert } from '../common/model/alert';
import { NgFor } from '@angular/common';

@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.css'],
    standalone: true,
    imports: [NgFor]
})
export class AlertComponent implements OnInit {
  messages: Alert[] = [];
  private messageService = inject(MessageService);

  constructor(
  ) {
    this.messages = this.messageService.messages;
  }

  ngOnInit(): void {
  }

  
}
