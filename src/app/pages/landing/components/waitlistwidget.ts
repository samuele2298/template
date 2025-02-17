import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; 
import { environment } from '../../../../environments/environment';

@Component({
    selector: 'waitlist-widget',
    standalone: true,
    imports: [FormsModule], // Import FormsModule here for standalone components
    template: `
        <div id="waitlist" class="mx-auto my-12 max-w-7xl px-6 sm:my-16 lg:px-8">
            <div class="relative isolate overflow-hidden bg-[var(--bg-light)] dark:bg-[var(--bg-dark)] px-6 py-24 shadow-2xl rounded-2xl sm:rounded-3xl sm:px-24 xl:py-32">
                <h2 class="mx-auto max-w-2xl text-center text-3xl font-bold tracking-tight text-[var(--text-light) dark:text-[var(--text-dark)] sm:text-4xl">
                    Waitlist 
                </h2>

                <p class="mx-auto mt-2 max-w-xl text-center text-lg leading-8 text-[var(--text-light)] dark:text-[var(--text-dark)]">
                    Waitlist..
                </p>

                <form class="mx-auto mt-10 flex max-w-md gap-x-4" (ngSubmit)="sendEmail($event)">

                    <label for="email-address" class="sr-only">Email address</label>
                    <input id="email-address" name="email" type="email" [(ngModel)]="email" autocomplete="email" required
                        class="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6"
                        placeholder="Enter your email">

                    <button type="submit" [disabled]="loading"
                        class="flex-none rounded-md bg-[var(--primary-light)] dark:bg-[var(--primary-dark)] px-3.5 py-2.5 text-sm font-semibold text-[var(--text-light)] dark:text-[var(--text-dark)] shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                        {{ loading ? 'Sending...' : 'Notify me' }}
                    </button>
                </form>

                <svg viewBox="0 0 1024 1024" class="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2"
                    aria-hidden="true">
                    <circle cx="512" cy="512" r="512" fill="url(#759c1415-0410-454c-8f7c-9a820de03641)" fill-opacity="0.7">
                    </circle>
                    <defs>
                        <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641" cx="0" cy="0" r="1"
                            gradientUnits="userSpaceOnUse" gradientTransform="translate(512 512) rotate(90) scale(512)">
                            <stop id="gradient-stop-1" ></stop>
                            <stop id="gradient-stop-2" offset="1" style="stop-opacity: 0;"></stop>
                        </radialGradient>
                    </defs>
                </svg>

            </div>
        </div>
    `,
    styles: [
        `input:disabled, button:disabled { opacity: 0.5; cursor: not-allowed; }`,
        `#gradient-stop-1 {
            stop-color: var(--primary-light);
        }
    
        #gradient-stop-2 {
            stop-color: var(--primary-light);
        }
        @media (prefers-color-scheme: dark) {
            #gradient-stop-1 {
                stop-color: var(--primary-dark);
            }

            #gradient-stop-2 {
                stop-color: var(--primary-dark);
            }
        }`
    ]
})
export class WaitlistWidget {
    private http = inject(HttpClient);
    
    email: string = '';
    loading: boolean = false;
    message: string = '';
    errorMessage: string = '';

    constructor() {}

    sendEmail(event: Event) {
        event.preventDefault();
        if (!this.email) return;

        this.loading = true;
        this.message = '';
        this.errorMessage = '';

        fetch('https://api.emailjs.com/api/v1.0/email/send', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
				service_id: environment.EMAILJS_SERVICE_ID,   // Your Service ID
				template_id: environment.EMAILJS_TEMPLATE_ID, // Your Template ID
				user_id: environment.EMAILJS_USER_ID,         // Your User ID from EmailJS
				template_params: {email: this.email}  // The email parameters
			}),
            mode: 'no-cors', // CORS mode set here
          })
          .then((response) => {
            if (response.ok) {
              console.log('Email sent');
            } else {
              console.error('Error sending email:', response);
            }
          })
          .catch((error) => {
            console.error('Network or CORS error:', error);
          });
    }


}
