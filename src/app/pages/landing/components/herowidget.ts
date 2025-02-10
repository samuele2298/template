import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';

@Component({
    selector: 'hero-widget',
    imports: [ButtonModule, RippleModule],
    template: `
        <div 
            id="hero" 
            class="flex flex-col md:flex-row items-center justify-between gap-8 px-6 lg:px-20 py-12"
            style="background-color: var(--background);">

            <!-- Left Content -->
            <div class="w-full md:w-1/2 text-center md:text-left">
                <span 
                    class="px-4 py-3 rounded-full font-semibold"
                    style="background-color: var(--primary); color: var(--text-light);"
                >
                    🚀 Potenzia il tuo Database
                </span>
                <h1 class="mt-8 text-4xl md:text-5xl font-extrabold leading-tight"
                    style="color: var(--text-light);"
                >
                    Il meglio per il tuo DB ecco:
                    <span style="color: var(--primary);"> Sonic </span>
                </h1>
                <p class="mt-4 text-lg md:text-xl leading-relaxed"
                    style="color: var(--text-light);"
                >
                    Il meglio del meglio del meglio...
                </p>
                <button 
                    pButton 
                    pRipple 
                    [rounded]="true" 
                    type="button" 
                    label="Get Started" 
                    class="mt-4 px-8 py-3 font-bold rounded-lg transition-all duration-300"
                    style="background-color: var(--primary); color: var(--text-light); border: none; box-shadow: none;"
                ></button>

            </div>

            <!-- Right Image -->
            <div class="w-full md:w-1/2 flex justify-center md:justify-end p-6 md:p-8">
                <img 
                    src="https://primefaces.org/cdn/templates/sakai/landing/screen-1.png" 
                    alt="Hero Image" 
                    class="w-10/12 md:w-auto rounded-xl shadow-lg"
                />
            </div>
        </div>
    `
})
export class HeroWidget {}
