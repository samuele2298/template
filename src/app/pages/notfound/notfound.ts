import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { AppFloatingConfigurator } from '../../layout/component/app.floatingconfigurator';

@Component({
    selector: 'app-notfound',
    standalone: true,
    imports: [RouterModule, AppFloatingConfigurator, ButtonModule],
    template: ` 
        <app-floating-configurator />
        <div class="flex bg-[var(--bg-dark)] dark:bg-[var(--bg-dark)] items-center justify-center min-h-screen overflow-hidden">
            <div class="flex flex-col items-center justify-center">
                <div style="border-radius: 20px; padding: 0.3rem; background: linear-gradient(180deg, rgba(83, 133, 229, 0.4) 20%, rgba(83, 133, 229, 0) 100%);">
                    <div class="w-full bg-[var(--bg-dark)] dark:bg-[var(--bg-dark)] py-20 px-8 sm:px-20 flex flex-col items-center" style="border-radius: 20px">
                        <div class="gap-4 flex flex-col items-center">
                            <div class="flex justify-center items-center border-2 border-blue-500 rounded-full" style="height: 3.2rem; width: 3.2rem">
                                <i class="pi pi-fw pi-exclamation-triangle text-2xl text-blue-500"></i>
                            </div>
                            <h1 class="text-[var(--text-dark)] dark:text-[var(--text-dark)] font-bold text-5xl mb-2">404</h1>
                            <span class="text-[var(--text-dark)] dark:text-[var(--text-dark)] mb-8">Requested resource not finded.</span>
                            <img src="assets/img/404.svg" alt="Error" class="mb-8" width="100%" />
                            <div class="text-[var(--text-dark)] dark:text-[var(--text-dark)] col-span-12 mt-8 text-center ">
                                <p-button label="Go to Dashboard" routerLink="/" severity="danger" [style]="buttonStyles"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`
})
export class Notfound {
    buttonStyles = {
        'color': 'white',
        'border-color': 'rgb(83, 133, 229)',  
        'background': 'rgb(83, 133, 229)'  
    };
}
