import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { loadStripe } from '@stripe/stripe-js';
import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StripeService {
  private stripe: any;

  constructor(private http: HttpClient) {
    //loadStripe(environment.STRIPE_TEST).then(stripe => {
    loadStripe(environment.STRIPE_PROD).then(stripe => {
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
