import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { RippleModule } from 'primeng/ripple';

@Component({
    selector: 'comparison-widget',
    imports: [DividerModule, ButtonModule, RippleModule],
    template: `
        <div id="comparison" class="text-[var(--text-light)] dark:text-[var(--text-dark)] dark:text-[var(--text-dark)] body-font overflow-hidden">
            <div class="relative mx-auto max-w-7xl px-6 text-center lg:px-8">
                <div class="mx-auto max-w-2xl lg:max-w-4xl">
                <h2 class="text-lg font-semibold leading-8 text-[var(--primary-light)] dark:text-[var(--primary-dark)]">Comparison</h2>
                <p class="mt-2 text-4xl font-bold tracking-tight text-[var(--text-light)] dark:text-[var(--text-dark)] ">Comparison..</p>
                </div>
            </div>
            <div class="container px-20 mx-5 py-24 mx-auto flex flex-wrap">
                <div class="lg:w-1/4 mt-48 hidden lg:block">
                    <div class="mt-px border-t border-[var(--border)] border-b border-l rounded-tl-lg rounded-bl-lg overflow-hidden">
                        <p class="bg-[var(--bg-light)] dark:bg-[var(--bg-dark)] text-[var(--text-light)] dark:text-[var(--text-dark)] h-12 text-center px-4 flex items-center justify-start -mt-px">Fingerstache disrupt</p>
                        <p class="text-[var(--text-light)] dark:text-[var(--text-dark)] h-12 text-center px-4 flex items-center justify-start">Franzen hashtag</p>
                        <p class="bg-[var(--bg-light)] dark:bg-[var(--bg-dark)] text-[var(--text-light)] dark:text-[var(--text-dark)] h-12 text-center px-4 flex items-center justify-start">Tilde art party</p>
                        <p class="text-[var(--text-light)] dark:text-[var(--text-dark)] h-12 text-center px-4 flex items-center justify-start">Banh mi cornhole</p>
                        <p class="bg-[var(--bg-light)] dark:bg-[var(--bg-dark)] text-[var(--text-light)] dark:text-[var(--text-dark)] h-12 text-center px-4 flex items-center justify-start">Waistcoat squid hexagon</p>
                        <p class="text-[var(--text-light)] dark:text-[var(--text-dark)] h-12 text-center px-4 flex items-center justify-start">Pinterest occupy authentic</p>
                        <p class="bg-[var(--bg-light)] dark:bg-[var(--bg-dark)] text-[var(--text-light)] dark:text-[var(--text-dark)] h-12 text-center px-4 flex items-center justify-start">Brooklyn helvetica</p>
                        <p class="text-[var(--text-light)] dark:text-[var(--text-dark)] h-12 text-center px-4 flex items-center justify-start">Long Feature Two</p>
                        <p class="bg-[var(--bg-light)] dark:bg-[var(--bg-dark)] text-[var(--text-light)] dark:text-[var(--text-dark)] h-12 text-center px-4 flex items-center justify-start">Feature One</p>
                    </div>
                    </div>
                    <!-- 1 column -->
                    <div class="flex lg:w-3/4 w-full flex-wrap lg:border border-[var(--border)] rounded-lg">
                    <!-- 2 column -->
                    <div class="lg:w-1/3 lg:mt-px w-full mb-10 lg:mb-0 border-2 border-[var(--border)] lg:border-none rounded-lg lg:rounded-none">
                        <div class="px-2 text-center h-48 flex flex-col items-center justify-center">
                        <h3 class="tracking-widest text-[var(--text-light)] dark:text-[var(--text-dark)]">START</h3>
                        <h2 class="text-5xl text-[var(--text-light)] dark:text-[var(--text-dark)] font-medium leading-none mb-4 mt-2">Free</h2>
                        <span class="text-sm text-[var(--text-light)] dark:text-[var(--text-dark)]">Next 3 months</span>
                        </div>
                        <p class="bg-[var(--bg-light)] dark:bg-[var(--bg-dark)] text-[var(--text-light)] dark:text-[var(--text-dark)] h-12 text-center px-2 flex items-center -mt-px justify-center border-t border-[var(--border)]">Schlitz single-origin</p>
                        <p class="text-[var(--text-light)] dark:text-[var(--text-dark)] text-center h-12 flex items-center justify-center">
                        <span class="w-5 h-5 inline-flex items-center justify-center bg-gray-500 text-white rounded-full flex-shrink-0">
                            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" class="w-3 h-3" viewBox="0 0 24 24">
                            <path d="M20 6L9 17l-5-5"></path>
                            </svg>
                        </span>
                        </p>
                        <p class="bg-[var(--bg-light)] dark:bg-[var(--bg-dark)] text-[var(--text-light)] dark:text-[var(--text-dark)] text-center h-12 flex items-center justify-center">
                        <span class="w-5 h-5 inline-flex items-center justify-center bg-gray-500 text-white rounded-full flex-shrink-0">
                            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" class="w-3 h-3" viewBox="0 0 24 24">
                            <path d="M20 6L9 17l-5-5"></path>
                            </svg>
                        </span>
                        </p>
                        <p class="h-12 text-[var(--text-light)] dark:text-[var(--text-dark)] px-6 text-center leading-relaxed flex items-center justify-center">Feature</p>
                        <p class="bg-[var(--bg-light)] dark:bg-[var(--bg-dark)] text-[var(--text-light)] dark:text-[var(--text-dark)] text-center h-12 flex items-center justify-center">
                        <span class="w-5 h-5 inline-flex items-center justify-center bg-gray-500 text-white rounded-full flex-shrink-0">
                            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" class="w-3 h-3" viewBox="0 0 24 24">
                            <path d="M20 6L9 17l-5-5"></path>
                            </svg>
                        </span>
                        </p>
                        <p class="text-[var(--text-light)] dark:text-[var(--text-dark)] text-center h-12 flex items-center justify-center">
                        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" class="w-5 h-5 text-[var(--text-light)] dark:text-[var(--text-dark)]" viewBox="0 0 24 24">
                            <path d="M18 6L6 18M6 6l12 12"></path>
                        </svg>
                        </p>
                        <p class="bg-[var(--bg-light)] dark:bg-[var(--bg-dark)] text-[var(--text-light)] dark:text-[var(--text-dark)] text-center h-12 flex items-center justify-center">
                        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" class="w-5 h-5 text-[var(--text-light)] dark:text-[var(--text-dark)]" viewBox="0 0 24 24">
                            <path d="M18 6L6 18M6 6l12 12"></path>
                        </svg>
                        </p>
                        <p class="text-[var(--text-light)] dark:text-[var(--text-dark)] text-center h-12 flex items-center justify-center">
                        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" class="w-5 h-5 text-[var(--text-light)] dark:text-[var(--text-dark)]" viewBox="0 0 24 24">
                            <path d="M18 6L6 18M6 6l12 12"></path>
                        </svg>
                        </p>
                        <p class="bg-[var(--bg-light)] dark:bg-[var(--bg-dark)] text-[var(--text-light)] dark:text-[var(--text-dark)] text-center h-12 flex items-center justify-center">
                        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" class="w-5 h-5 text-[var(--text-light)] dark:text-[var(--text-dark)]" viewBox="0 0 24 24">
                            <path d="M18 6L6 18M6 6l12 12"></path>
                        </svg>
                        </p>
                        <!-- <div class="border-t border-gray-300 p-6 text-center rounded-bl-lg">
                        <button class="flex items-center mt-auto text-white bg-indigo-500 border-0 py-2 px-4 w-full focus:outline-none hover:bg-indigo-600 rounded">Button
                            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-auto" viewBox="0 0 24 24">
                            <path d="M5 12h14M12 5l7 7-7 7"></path>
                            </svg>
                        </button>
                        <p class="text-xs text-[var(--text-light)] dark:text-[var(--text-dark)] mt-3">Literally you probably haven't heard of them jean shorts.</p>
                        </div> -->
                    </div>
                    <!-- 3 column -->
                    <div class="lg:w-1/3 lg:-mt-px w-full mb-10 lg:mb-0 border-2 rounded-lg border-border-[var(--primary-light)] relative">
                        <span class="bg-[var(--primary)] text-white px-3 py-1 tracking-widest text-xs absolute right-0 top-0 rounded-bl">POPULAR</span>
                        <div class="px-2 text-center h-48 flex flex-col items-center justify-center">
                        <h3 class="tracking-widest text-[var(--text-light)] dark:text-[var(--text-dark)]">PRO</h3>
                        <h2 class="text-5xl text-[var(--text-light)] dark:text-[var(--text-dark)] font-medium flex items-center justify-center leading-none mb-4 mt-2">$38
                            <span class="text-[var(--text-light)] dark:text-[var(--text-dark)] text-base ml-1">/mo</span>
                        </h2>
                        <span class="text-sm text-[var(--text-light)] dark:text-[var(--text-dark)]">Charging $456 per year</span>
                        </div>
                        <p class="bg-[var(--bg-light)] dark:bg-[var(--bg-dark)] text-[var(--text-light)] dark:text-[var(--text-dark)] h-12 text-center px-2 flex items-center -mt-px justify-center border-t border-gray-300">Schlitz single-origin</p>
                        <p class="text-[var(--text-light)] dark:text-[var(--text-dark)] text-center h-12 flex items-center justify-center">
                        <span class="w-5 h-5 inline-flex items-center justify-center bg-gray-500 text-white rounded-full flex-shrink-0">
                            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" class="w-3 h-3" viewBox="0 0 24 24">
                            <path d="M20 6L9 17l-5-5"></path>
                            </svg>
                        </span>
                        </p>
                        <p class="bg-[var(--bg-light)] dark:bg-[var(--bg-dark)] text-[var(--text-light)] dark:text-[var(--text-dark)] text-center h-12 flex items-center justify-center">
                        <span class="w-5 h-5 inline-flex items-center justify-center bg-gray-500 text-white rounded-full flex-shrink-0">
                            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" class="w-3 h-3" viewBox="0 0 24 24">
                            <path d="M20 6L9 17l-5-5"></path>
                            </svg>
                        </span>
                        </p>
                        <p class="h-12 text-[var(--text-light)] dark:text-[var(--text-dark)] text-center leading-relaxed flex items-center justify-center">Feature</p>
                        <p class="bg-[var(--bg-light)] dark:bg-[var(--bg-dark)] text-[var(--text-light)] dark:text-[var(--text-dark)] text-center h-12 flex items-center justify-center">
                        <span class="w-5 h-5 inline-flex items-center justify-center bg-gray-500 text-white rounded-full flex-shrink-0">
                            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" class="w-3 h-3" viewBox="0 0 24 24">
                            <path d="M20 6L9 17l-5-5"></path>
                            </svg>
                        </span>
                        </p>
                        <p class="text-[var(--text-light)] dark:text-[var(--text-dark)] text-center h-12 flex items-center justify-center">
                        <span class="w-5 h-5 inline-flex items-center justify-center bg-gray-500 text-white rounded-full flex-shrink-0">
                            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" class="w-3 h-3" viewBox="0 0 24 24">
                            <path d="M20 6L9 17l-5-5"></path>
                            </svg>
                        </span>
                        </p>
                        <p class="bg-[var(--bg-light)] dark:bg-[var(--bg-dark)] text-[var(--text-light)] dark:text-[var(--text-dark)] text-center h-12 flex items-center justify-center">
                        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" class="w-5 h-5 text-[var(--text-light)] dark:text-[var(--text-dark)]" viewBox="0 0 24 24">
                            <path d="M18 6L6 18M6 6l12 12"></path>
                        </svg>
                        </p>
                        <p class="text-[var(--text-light)] dark:text-[var(--text-dark)] text-center h-12 flex items-center justify-center">
                        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" class="w-5 h-5 text-[var(--text-light)] dark:text-[var(--text-dark)]" viewBox="0 0 24 24">
                            <path d="M18 6L6 18M6 6l12 12"></path>
                        </svg>
                        </p>
                        <p class="bg-[var(--bg-light)] dark:bg-[var(--bg-dark)] text-[var(--text-light)] dark:text-[var(--text-dark)] text-center h-12 flex items-center justify-center">
                        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" class="w-5 h-5 text-[var(--text-light)] dark:text-[var(--text-dark)]" viewBox="0 0 24 24">
                            <path d="M18 6L6 18M6 6l12 12"></path>
                        </svg>
                        </p>
                        <!-- <div class="p-6 text-center border-t border-gray-300">
                        <button class="flex items-center mt-auto text-white bg-indigo-500 border-0 py-2 px-4 w-full focus:outline-none hover:bg-indigo-600 rounded">Button
                            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-auto" viewBox="0 0 24 24">
                            <path d="M5 12h14M12 5l7 7-7 7"></path>
                            </svg>
                        </button>
                        <p class="text-xs text-[var(--text-light)] dark:text-[var(--text-dark)] mt-3">Literally you probably haven't heard of them jean shorts.</p>
                        </div> -->
                    </div>
                    <!-- 4 column -->
                    <div class="lg:w-1/3 w-full lg:mt-px border-2 border-gray-300 lg:border-none rounded-lg lg:rounded-none">
                        <div class="px-2 text-center h-48 flex flex-col items-center justify-center">
                        <h3 class="tracking-widest text-[var(--text-light)] dark:text-[var(--text-dark)]">BUSINESS</h3>
                        <h2 class="text-5xl text-[var(--text-light)] dark:text-[var(--text-dark)] font-medium flex items-center justify-center leading-none mb-4 mt-2">$54
                            <span class="text-[var(--text-light)] dark:text-[var(--text-dark)] text-base ml-1">/mo</span>
                        </h2>
                        <span class="text-sm text-[var(--text-light)] dark:text-[var(--text-dark)]">Charging $648 per year</span>
                        </div>
                        <p class="bg-[var(--bg-light)] dark:bg-[var(--bg-dark)] text-[var(--text-light)] dark:text-[var(--text-dark)] h-12 text-center px-2 flex items-center -mt-px justify-center border-t border-gray-300">Schlitz single-origin</p>
                        <p class="text-[var(--text-light)] dark:text-[var(--text-dark)] text-center h-12 flex items-center justify-center">
                        <span class="w-5 h-5 inline-flex items-center justify-center bg-gray-500 text-white rounded-full flex-shrink-0">
                            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" class="w-3 h-3" viewBox="0 0 24 24">
                            <path d="M20 6L9 17l-5-5"></path>
                            </svg>
                        </span>
                        </p>
                        <p class="bg-[var(--bg-light)] dark:bg-[var(--bg-dark)] text-[var(--text-light)] dark:text-[var(--text-dark)] text-center h-12 flex items-center justify-center">
                        <span class="w-5 h-5 inline-flex items-center justify-center bg-gray-500 text-white rounded-full flex-shrink-0">
                            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" class="w-3 h-3" viewBox="0 0 24 24">
                            <path d="M20 6L9 17l-5-5"></path>
                            </svg>
                        </span>
                        </p>
                        <p class="h-12 text-[var(--text-light)] dark:text-[var(--text-dark)] text-center leading-relaxed flex items-center justify-center">Feature</p>
                        <p class="bg-[var(--bg-light)] dark:bg-[var(--bg-dark)] text-[var(--text-light)] dark:text-[var(--text-dark)] text-center h-12 flex items-center justify-center">
                        <span class="w-5 h-5 inline-flex items-center justify-center bg-gray-500 text-white rounded-full flex-shrink-0">
                            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" class="w-3 h-3" viewBox="0 0 24 24">
                            <path d="M20 6L9 17l-5-5"></path>
                            </svg>
                        </span>
                        </p>
                        <p class="text-[var(--text-light)] dark:text-[var(--text-dark)] text-center h-12 flex items-center justify-center">
                        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" class="w-5 h-5 text-[var(--text-light)] dark:text-[var(--text-dark)]" viewBox="0 0 24 24">
                            <path d="M18 6L6 18M6 6l12 12"></path>
                        </svg>
                        </p>
                        <p class="bg-[var(--bg-light)] dark:bg-[var(--bg-dark)] text-[var(--text-light)] dark:text-[var(--text-dark)] text-center h-12 flex items-center justify-center">
                        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" class="w-5 h-5 text-[var(--text-light)] dark:text-[var(--text-dark)]" viewBox="0 0 24 24">
                            <path d="M18 6L6 18M6 6l12 12"></path>
                        </svg>
                        </p>
                        <p class="text-[var(--text-light)] dark:text-[var(--text-dark)] text-center h-12 flex items-center justify-center">
                        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" class="w-5 h-5 text-[var(--text-light)] dark:text-[var(--text-dark)]" viewBox="0 0 24 24">
                            <path d="M18 6L6 18M6 6l12 12"></path>
                        </svg>
                        </p>
                        <p class="bg-[var(--bg-light)] dark:bg-[var(--bg-dark)] text-[var(--text-light)] dark:text-[var(--text-dark)] text-center h-12 flex items-center justify-center">
                        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" class="w-5 h-5 text-[var(--text-light)] dark:text-[var(--text-dark)]" viewBox="0 0 24 24">
                            <path d="M18 6L6 18M6 6l12 12"></path>
                        </svg>
                        </p>
                        <!-- <div class="p-6 text-center border-t border-gray-300">
                        <button class="flex items-center mt-auto text-white bg-indigo-500 border-0 py-2 px-4 w-full focus:outline-none hover:bg-indigo-600 rounded">Button
                            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-auto" viewBox="0 0 24 24">
                            <path d="M5 12h14M12 5l7 7-7 7"></path>
                            </svg>
                        </button>
                        <p class="text-xs text-[var(--text-light)] dark:text-[var(--text-dark)] mt-3">Literally you probably haven't heard of them jean shorts.</p>
                        </div> -->
                    </div>
                </div>
            </div>
        </div>
    `
})
export class ComparisonWidget {}
