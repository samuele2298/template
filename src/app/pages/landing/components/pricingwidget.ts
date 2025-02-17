import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { RippleModule } from 'primeng/ripple';

@Component({
    selector: 'pricing-widget',
    imports: [DividerModule, ButtonModule, RippleModule],
    template: `
        <div id="pricing" class="py-6 px-6 lg:px-20 my-2 md:my-6">
            <div class="relative mx-auto max-w-7xl px-6 text-center lg:px-8 mb-10">
                <div class="mx-auto max-w-2xl lg:max-w-4xl">
                <h2 class="text-lg font-semibold leading-8 text-[var(--primary-light)] dark:text-[var(--primary-dark)]">Pricing</h2>
                <p class="mt-2 text-4xl font-bold tracking-tight text-[var(--text-light)] dark:text-[var(--text-dark)]">Pricing..</p>
                </div>
            </div>
            <div class="mx-auto max-w-7xl px-6 lg:px-8 mb-6">
                <div class="mt-16 flex justify-center">
                <div class="flex items-center">
                    <button class="bg-[var(--primary-light)] dark:bg-[var(--primary-dark)] relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2" id="headlessui-switch-:R38bm:" role="switch" type="button" tabindex="0" aria-checked="true" data-headlessui-state="checked" aria-labelledby="headlessui-label-:R58bm:"><span aria-hidden="true" class="translate-x-5 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"></span></button><span class="ml-3 text-sm" id="headlessui-label-:R58bm:"><span class="font-medium text-[var(--text-light)] dark:text-[var(--text-dark)]">Annual billing </span>
                    <span class="text-[var(--text-light)] dark:text-[var(--text-dark)]">(Save 45%)</span></span>
                </div>
                </div>
            </div>
            <div class="">
                <div class="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
                    <div class="mx-auto grid max-w-md grid-cols-1 gap-8 lg:max-w-7xl lg:grid-cols-3 lg:gap-8">
                        <!-- BASIC -->   
                        <div class="flex flex-col rounded-3xl bg-[var(--bg-light)] dark:bg-[var(--bg-dark)] shadow-xl ring-1 ring-black/10">
                            <div class="p-8 sm:p-10">
                                <div class="flex">
                                    <h3 class="text-lg font-semibold leading-8 tracking-tight text-[var(--primary-light)] dark:text-[var(--primary-dark)]" id="tier-basic">Basic (For
                                        individuals)</h3>
                                    <div class="items-center ml-2"></div>
                                </div>
                                <div class="mt-4 flex items-baseline text-5xl tracking-tight text-[var(--text-light)] dark:text-[var(--text-dark)] font-semibold">
                                $0<span class="text-lg font-semibold leading-8 tracking-normal text-[var(--text-light)] dark:text-[var(--text-light)]"></span></div>
                                <p class="mt-6 text-base leading-7 text-[var(--text-light)] dark:text-[var(--text-dark)]">Great for getting started. Sign your first two documents
                                for free.</p>
                            </div>
                            <div class="flex flex-1 flex-col p-2">
                                <div class="flex flex-1 flex-col justify-between rounded-2xl bg-gray-50 dark:bg-[rgba(0,0,0,0)] p-6 sm:p-8">
                                    <ul role="list" class="space-y-6">
                                        <li class="flex items-start">
                                        <div class="flex-shrink-0">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                            stroke="currentColor" aria-hidden="true" class="h-6 w-6 text-[var(--primary-light)] dark:text-[var(--primary-dark)]">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"></path>
                                            </svg>
                                        </div>
                                        <p class="ml-3 text-sm leading-6 text-[var(--text-light)] dark:text-[var(--text-dark)]">1 document</p>
                                        </li>
                                        <li class="flex items-start">
                                        <div class="flex-shrink-0">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                            stroke="currentColor" aria-hidden="true" class="h-6 w-6 text-[var(--primary-light)] dark:text-[var(--primary-dark)]">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"></path>
                                            </svg>
                                        </div>
                                        <p class="ml-3 text-sm leading-6 text-[var(--text-light)] dark:text-[var(--text-dark)]">10 signees / document</p>
                                        </li>
                                        <li class="flex items-start">
                                        <div class="flex-shrink-0">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                            stroke="currentColor" aria-hidden="true" class="h-6 w-6 text-[var(--primary-light)] dark:text-[var(--primary-dark)]">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"></path>
                                            </svg>
                                        </div>
                                        <p class="ml-3 text-sm leading-6 text-[var(--text-light)] dark:text-[var(--text-dark)]">Customize signatory name and role</p>
                                        </li>
                                        <li class="flex items-start">
                                        <div class="flex-shrink-0">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                            stroke="currentColor" aria-hidden="true" class="h-6 w-6 text-[var(--primary-light)] dark:text-[var(--primary-dark)]">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"></path>
                                            </svg>
                                        </div>
                                        <p class="ml-3 text-sm leading-6 text-[var(--text-light)] dark:text-[var(--text-dark)]">No credit card required</p>
                                        </li>
                                    </ul>
                                    <div class="mt-8"><a
                                        class="inline-block w-full rounded-lg bg-[var(--primary-light)] dark:bg-[var(--primary-dark)] px-4 py-2.5 text-center text-sm font-semibold leading-5 text-[var(--text-light)] shadow-md hover:bg-[var(--primary)] dark:hover:bg-[var(--primary)] cursor-pointer"
                                        aria-describedby="tier-basic">Get started today</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- PRO -->
                        <div class="flex flex-col rounded-3xl bg-[var(--background-light)] dark:bg-[var(--background-light)] shadow-xl ring-1 ring-black/10">
                            <div class="p-8 sm:p-10">
                                <div class="flex">
                                    <h3 class="text-lg font-semibold leading-8 tracking-tight text-[var(--primary-light)] dark:text-[var(--primary-dark)] " id="tier-plus">Plus (For teams)
                                    </h3>
                                    <div class="items-center ml-2">
                                        <p class="rounded-full text-[var(--text-light)] bg-[var(--primary-light)] dark:bg-[var(--primary-dark)] px-2.5 py-1 text-xs font-semibold leading-5 text-[var(--text-light)] dark:ext-[var(--text-light)] ">45% OFF
                                        </p>
                                    </div>
                                </div>
                                <div class="mt-4 flex items-baseline text-5xl tracking-tight text-[var(--text-light)] dark:text-[var(--text-dark)] font-semibold">
                                $5<span class="text-lg font-semibold leading-8 tracking-normal text-[var(--text-light)] dark:text-[var(--text-dark)]">/month</span></div>
                                    <p class="mt-6 text-base leading-7 text-[var(--text-light)] dark:text-[var(--text-dark)]">Need higher quotas? Upgrade and sign up to 10 documents.
                                    </p>
                                </div>
                            <div class="flex flex-1 flex-col p-2">
                                <div class="flex flex-1 flex-col justify-between rounded-2xl bg-gray-50 dark:bg-[rgba(0,0,0,0)] p-6 sm:p-8">
                                <ul role="list" class="space-y-6">
                                    <li class="flex items-start">
                                    <div class="flex-shrink-0">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                        stroke="currentColor" aria-hidden="true" class="h-6 w-6 text-[var(--primary-light)] dark:text-[var(--primary-dark)]">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"></path>
                                        </svg>
                                    </div>
                                    <p class="ml-3 text-sm leading-6 text-[var(--text-light)] dark:text-[var(--text-dark)]">10 documents</p>
                                    </li>
                                    <li class="flex items-start">
                                    <div class="flex-shrink-0">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                        stroke="currentColor" aria-hidden="true" class="h-6 w-6 text-[var(--primary-light)] dark:text-[var(--primary-dark)]">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"></path>
                                        </svg>
                                    </div>
                                    <p class="ml-3 text-sm leading-6 text-[var(--text-light)] dark:text-[var(--text-dark)]">100 signees / document</p>
                                    </li>
                                    <li class="flex items-start">
                                    <div class="flex-shrink-0">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                        stroke="currentColor" aria-hidden="true" class="h-6 w-6 text-[var(--primary-light)] dark:text-[var(--primary-dark)]">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"></path>
                                        </svg>
                                    </div>
                                    <p class="ml-3 text-sm leading-6 text-[var(--text-light)] dark:text-[var(--text-dark)]">Export your signed documents</p>
                                    </li>
                                    <li class="flex items-start">
                                    <div class="flex-shrink-0">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                        stroke="currentColor" aria-hidden="true" class="h-6 w-6 text-[var(--primary-light)] dark:text-[var(--primary-dark)]">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"></path>
                                        </svg>
                                    </div>
                                    <p class="ml-3 text-sm leading-6 text-[var(--text-light)] dark:text-[var(--text-dark)]">Shared team accounts</p>
                                    </li>
                                </ul>
                                <div class="mt-8"><a
                                    class="inline-block w-full rounded-lg bg-[var(--primary-light)] dark:bg-[var(--primary-dark)] px-4 py-2.5 text-center text-sm font-semibold leading-5 text-[var(--text-light)] shadow-md hover:bg-[var(--primary)] dark:hover:bg-[var(--primary)] cursor-pointer"
                                    aria-describedby="tier-plus">Get started today</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- ELITE -->
                    <div class="flex flex-col rounded-3xl bg-[var(--bg-light)] dark:bg-[var(--bg-dark)] shadow-xl ring-1 ring-black/10">
                        <div class="p-8 sm:p-10">
                            <div class="flex">
                                <h3 class="text-lg font-semibold leading-8 tracking-tight text-[var(--primary-light)] dark:text-[var(--primary-dark)]" id="tier-custom">Custom (For
                                    enterprises)</h3>
                                <div class="items-center ml-2"></div>
                            </div>
                            <div class="mt-4 flex items-baseline text-5xl tracking-tight text-[var(--text-light)] dark:text-[var(--text-dark)] font-semibold">Contact
                            <span class="text-lg font-semibold leading-8 tracking-normal text-[var(--text-light)] dark:text-[var(--text-dark)]"></span></div>
                                <p class="mt-6 text-base leading-7 text-[var(--text-light)] dark:text-[var(--text-dark)]">Are you a business looking for higher quotas or custom
                            features?</p>
                        </div>
                        <div class="flex flex-1 flex-col p-2">
                            <div class="flex flex-1 flex-col justify-between rounded-2xl bg-gray-50 dark:bg-[rgba(0,0,0,0)] p-6 sm:p-8">
                            <ul role="list" class="space-y-6">
                                <li class="flex items-start">
                                <div class="flex-shrink-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                    stroke="currentColor" aria-hidden="true" class="h-6 w-6 text-[var(--primary-light)] dark:text-[var(--primary-dark)]">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"></path>
                                    </svg>
                                </div>
                                <p class="ml-3 text-sm leading-6 text-[var(--text-light)] dark:text-[var(--text-dark)]">Custom usage quotas</p>
                                </li>
                                <li class="flex items-start">
                                <div class="flex-shrink-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                    stroke="currentColor" aria-hidden="true" class="h-6 w-6 text-[var(--primary-light)] dark:text-[var(--primary-dark)]">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"></path>
                                    </svg>
                                </div>
                                <p class="ml-3 text-sm leading-6 text-[var(--text-light)] dark:text-[var(--text-dark)]">Customized document signing workflows</p>
                                </li>
                                <li class="flex items-start">
                                <div class="flex-shrink-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                    stroke="currentColor" aria-hidden="true" class="h-6 w-6 text-[var(--primary-light)] dark:text-[var(--primary-dark)]">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"></path>
                                    </svg>
                                </div>
                                <p class="ml-3 text-sm leading-6 text-[var(--text-light)] dark:text-[var(--text-dark)]">Integration with third-party document management
                                    systems</p>
                                </li>
                                <li class="flex items-start">
                                <div class="flex-shrink-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                    stroke="currentColor" aria-hidden="true" class="h-6 w-6 text-[var(--primary-light)] dark:text-[var(--primary-dark)]">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"></path>
                                    </svg>
                                </div>
                                <p class="ml-3 text-sm leading-6 text-[var(--text-light)] dark:text-[var(--text-dark)]">Dedicated account manager &amp; priority support</p>
                                </li>
                            </ul>
                            <div class="mt-8"><a
                                class="inline-block w-full rounded-lg bg-[var(--primary-light)] dark:bg-[var(--primary-dark)] px-4 py-2.5 text-center text-sm font-semibold leading-5 text-[var(--text-light)] shadow-md hover:bg-[var(--primary)] dark:hover:bg-[var(--primary)] cursor-pointer"
                                aria-describedby="tier-custom">Contact us</a></div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
})
export class PricingWidget {}
