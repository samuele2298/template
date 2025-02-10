import { Component, OnInit, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';
import { ClrModalModule, ClrInputModule, ClrAlertModule } from '@clr/angular';
import { StripeService } from '../../stripe.service';

@Component({
    selector: 'app-pricing',
    templateUrl: './pricing.component.html',
    styleUrls: ['./pricing.component.css'],
    standalone: true,
    imports: [ClrModalModule, FormsModule, ReactiveFormsModule, ClrInputModule, NgIf, ClrAlertModule, NgFor]
})
export class PricingComponents implements OnInit {
  private stripeService = inject(StripeService);
  isOpen: boolean = false;
  usdtAddress: string = 'TVrUa8h7GG79YuBYGHPMi8bYLpX8FPay2A'; // Replace with the actual USDT ERC-20 address

  constructor(){}

  ngOnInit(): void {
  }

  openModal(){
    this.isOpen = true;
  }

  closeModal(){
    this.isOpen = false;
  }

  copyAddress(){
    navigator.clipboard.writeText(this.usdtAddress);
  }

  onCheckout(plan: string) {
    this.stripeService.redirectToCheckout(plan).catch((error) => {
      console.error('Errore nel reindirizzare al checkout:', error);
    });
  }
}
