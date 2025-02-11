import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'brand-widget',
    standalone: true,
    imports: [CommonModule],
    template: ` 
        <div id="brand" class="bg-[var(--primary)] w-full px-4 pt-16 pb-16" id="faq">
            <div
                class="mx-auto w-full max-w-4xl bg-trasparent justify-center items-center grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                <a target="_blank" href="">
                    <img alt="" class="h-20  mx-auto" src="https://www.svgrepo.com/show/442910/brand-apple.svg">
                </a>
                <a target="_blank" href="">
                    <img alt="" class="h-20  mx-auto" src="https://www.svgrepo.com/show/443329/brand-pixar.svg">
                </a>
                <a target="_blank" href="">
                    <img alt="" class="h-20  mx-auto" src="https://www.svgrepo.com/show/443079/brand-geforce.svg">
                </a>
                <a target="_blank" href="">
                    <img alt="" class="h-20  mx-auto" src="https://www.svgrepo.com/show/443042/brand-ethereum.svg">
                </a>
                <a target="_blank" href="">
                    <img alt="" class="h-20  mx-auto" src="https://www.svgrepo.com/show/443206/brand-line.svg">
                </a>
                <a target="_blank" href="">
                    <img alt="" class="h-20  mx-auto" src="https://www.svgrepo.com/show/519278/slack.svg">
                </a>
            </div>
        </div>
    `
})
export class BrandWidget {}
