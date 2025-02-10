import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { loadStripe } from '@stripe/stripe-js';

@Injectable({
  providedIn: 'root'
})
export class StripeService {
  private stripe: any;

  constructor(private http: HttpClient) {
    //loadStripe('pk_test_51QK2grJdj2rVidv51y1dNDiiT11kO6z9XzQMd6q6tFXEbiz5RlLO2WbUWc1scBO8LsTR9xLFZ5eTOtwVHmhYtDR900HIpSee3K').then(stripe => {
    loadStripe('pk_live_51QK2grJdj2rVidv5Zol62jzHou7j1z0xe7XBVLrmSRTvdVKnzUrMkBfTEFCcpwACHZ6a8lgqjXrVSTWCYjHhlqBy00Gb1sf2uU').then(stripe => {
      this.stripe = stripe;
    }).catch(error => {
      console.error('Error loading Stripe:', error);
    });
  }

  // Funzione per creare la sessione di pagamento con il piano selezionato
  createCheckoutSession(plan: string) {
    return this.http.get<{ id: string }>('/api/stripe/create-checkout/'+plan ).toPromise();
  }

  // Reindirizza al checkout di Stripe
  async redirectToCheckout(plan: string) {
    const session = await this.createCheckoutSession(plan);
    if (!session || !session.id) {
      console.log("Session ID not found.");
      return;
    }
    const result = await this.stripe.redirectToCheckout({
      sessionId: session.id
    });

    if (result.error) {
      alert(result.error.message);
    }
  }
}
