import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';

@Component({
    selector: 'hero-widget',
    imports: [ButtonModule, RippleModule],
    template: `
        <div
            id="hero"
            class="flex flex-col pt-6 px-6 lg:px-20 overflow-hidden"
            style=""
        >
            <div class="mx-6 md:mx-20 mt-0 md:mt-6">
                <h1 class="text-5xl font-extrabold text-gray-900 leading-tight sm:text-gray-6xl sm:font-bold">
                    Il meglio per il tuo DB ecco:
                    <span class="text-green-800"> Sonic </span>
                </h1>
                <p class="font-normal text-2xl leading-normal md:mt-4 text-gray-700">
                    Il meglio del meglio del meglio del meglio del meglio del meglio del meglio del meglio del meglio del meglio...
                </p>
                <button pButton pRipple [rounded]="false" type="button" label="Get Started" class="!text-xl mt-8 !px-4"></button>
            </div>
            <div class="flex justify-center md:justify-end">
                <img src="https://primefaces.org/cdn/templates/sakai/landing/screen-1.png" alt="Hero Image" class="w-9/12 md:w-auto" />
            </div>
        </div>
    `
})
export class HeroWidget {}
