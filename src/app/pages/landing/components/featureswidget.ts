import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'features-widget',
    standalone: true,
    imports: [CommonModule],
    template: ` 
    <!-- <div id="features" class="py-6 px-6 lg:px-20 mt-8 mx-0 lg:mx-20">
        <div class="relative mb-10  mx-auto max-w-7xl px-6 text-center lg:px-8">
            <div class="mx-auto max-w-2xl lg:max-w-4xl">
                <h2 class="text-lg font-semibold leading-8 text-[var(--primary)] dark:text-[var(--primary)]">Features</h2>
                <p class="mt-2 text-4xl font-bold tracking-tight text-[var(--text-light)] dark:text-[var(--text-light)]">Features..</p>
            </div>
        </div>
        <div class="grid grid-cols-12 gap-4 justify-center">
      
         <div class="col-span-12 md:col-span-12 lg:col-span-4 p-0 lg:pr-8 lg:pb-8 mt-6 lg:mt-0">
                <div style="height: 160px; padding: 2px; border-radius: 10px; background: linear-gradient(90deg, rgba(253, 228, 165, 0.2), rgba(187, 199, 205, 0.2)), linear-gradient(180deg, rgba(253, 228, 165, 0.2), rgba(187, 199, 205, 0.2))">
                    <div class="p-4 bg-surface-0 dark:bg-surface-900 h-full" style="border-radius: 8px">
                        <div class="flex items-center justify-center bg-yellow-200 mb-4" style="width: 3.5rem; height: 3.5rem; border-radius: 10px">
                            <i class="pi pi-fw pi-users !text-2xl text-yellow-700"></i>
                        </div>
                        <h5 class="mb-2 text-surface-900 dark:text-surface-0">Easy to Use</h5>
                        <span class="text-surface-600 dark:text-surface-200">Posuere morbi leo urna molestie.</span>
                    </div>
                </div>
            </div>

            <div class="col-span-12 md:col-span-12 lg:col-span-4 p-0 lg:pr-8 lg:pb-8 mt-6 lg:mt-0">
                <div style="height: 160px; padding: 2px; border-radius: 10px; background: linear-gradient(90deg, rgba(145, 226, 237, 0.2), rgba(251, 199, 145, 0.2)), linear-gradient(180deg, rgba(253, 228, 165, 0.2), rgba(172, 180, 223, 0.2))">
                    <div class="p-4 bg-surface-0 dark:bg-surface-900 h-full" style="border-radius: 8px">
                        <div class="flex items-center justify-center bg-cyan-200 mb-4" style="width: 3.5rem; height: 3.5rem; border-radius: 10px">
                            <i class="pi pi-fw pi-palette !text-2xl text-cyan-700"></i>
                        </div>
                        <h5 class="mb-2 text-surface-900 dark:text-surface-0">Fresh Design</h5>
                        <span class="text-surface-600 dark:text-surface-200">Semper risus in hendrerit.</span>
                    </div>
                </div>
            </div>

            <div class="col-span-12 md:col-span-12 lg:col-span-4 p-0 lg:pb-8 mt-6 lg:mt-0">
                <div style="height: 160px; padding: 2px; border-radius: 10px; background: linear-gradient(90deg, rgba(145, 226, 237, 0.2), rgba(172, 180, 223, 0.2)), linear-gradient(180deg, rgba(172, 180, 223, 0.2), rgba(246, 158, 188, 0.2))">
                    <div class="p-4 bg-surface-0 dark:bg-surface-900 h-full" style="border-radius: 8px">
                        <div class="flex items-center justify-center bg-indigo-200" style="width: 3.5rem; height: 3.5rem; border-radius: 10px">
                            <i class="pi pi-fw pi-map !text-2xl text-indigo-700"></i>
                        </div>
                        <div class="mt-6 mb-1 text-surface-900 dark:text-surface-0 text-xl font-semibold">Well Documented</div>
                        <span class="text-surface-600 dark:text-surface-200">Non arcu risus quis varius quam quisque.</span>
                    </div>
                </div>
            </div>

            <div class="col-span-12 md:col-span-12 lg:col-span-4 p-0 lg:pr-8 lg:pb-8 mt-6 lg:mt-0">
                <div style="height: 160px; padding: 2px; border-radius: 10px; background: linear-gradient(90deg, rgba(187, 199, 205, 0.2), rgba(251, 199, 145, 0.2)), linear-gradient(180deg, rgba(253, 228, 165, 0.2), rgba(145, 210, 204, 0.2))">
                    <div class="p-4 bg-surface-0 dark:bg-surface-900 h-full" style="border-radius: 8px">
                        <div class="flex items-center justify-center bg-slate-200 mb-4" style="width: 3.5rem; height: 3.5rem; border-radius: 10px">
                            <i class="pi pi-fw pi-id-card !text-2xl text-slate-700"></i>
                        </div>
                        <div class="mt-6 mb-1 text-surface-900 dark:text-surface-0 text-xl font-semibold">Responsive Layout</div>
                        <span class="text-surface-600 dark:text-surface-200">Nulla malesuada pellentesque elit.</span>
                    </div>
                </div>
            </div>

            <div class="col-span-12 md:col-span-12 lg:col-span-4 p-0 lg:pr-8 lg:pb-8 mt-6 lg:mt-0">
                <div style="height: 160px; padding: 2px; border-radius: 10px; background: linear-gradient(90deg, rgba(187, 199, 205, 0.2), rgba(246, 158, 188, 0.2)), linear-gradient(180deg, rgba(145, 226, 237, 0.2), rgba(160, 210, 250, 0.2))">
                    <div class="p-4 bg-surface-0 dark:bg-surface-900 h-full" style="border-radius: 8px">
                        <div class="flex items-center justify-center bg-orange-200 mb-4" style="width: 3.5rem; height: 3.5rem; border-radius: 10px">
                            <i class="pi pi-fw pi-star !text-2xl text-orange-700"></i>
                        </div>
                        <div class="mt-6 mb-1 text-surface-900 dark:text-surface-0 text-xl font-semibold">Clean Code</div>
                        <span class="text-surface-600 dark:text-surface-200">Condimentum lacinia quis vel eros.</span>
                    </div>
                </div>
            </div>

            <div class="col-span-12 md:col-span-12 lg:col-span-4 p-0 lg:pb-8 mt-6 lg:mt-0">
                <div style="height: 160px; padding: 2px; border-radius: 10px; background: linear-gradient(90deg, rgba(251, 199, 145, 0.2), rgba(246, 158, 188, 0.2)), linear-gradient(180deg, rgba(172, 180, 223, 0.2), rgba(212, 162, 221, 0.2))">
                    <div class="p-4 bg-surface-0 dark:bg-surface-900 h-full" style="border-radius: 8px">
                        <div class="flex items-center justify-center bg-pink-200 mb-4" style="width: 3.5rem; height: 3.5rem; border-radius: 10px">
                            <i class="pi pi-fw pi-moon !text-2xl text-pink-700"></i>
                        </div>
                        <div class="mt-6 mb-1 text-surface-900 dark:text-surface-0 text-xl font-semibold">Dark Mode</div>
                        <span class="text-surface-600 dark:text-surface-200">Convallis tellus id interdum velit laoreet.</span>
                    </div>
                </div>
            </div>

            <div class="col-span-12 md:col-span-12 lg:col-span-4 p-0 lg:pr-8 mt-6 lg:mt-0">
                <div style="height: 160px; padding: 2px; border-radius: 10px; background: linear-gradient(90deg, rgba(145, 210, 204, 0.2), rgba(160, 210, 250, 0.2)), linear-gradient(180deg, rgba(187, 199, 205, 0.2), rgba(145, 210, 204, 0.2))">
                    <div class="p-4 bg-surface-0 dark:bg-surface-900 h-full" style="border-radius: 8px">
                        <div class="flex items-center justify-center bg-teal-200 mb-4" style="width: 3.5rem; height: 3.5rem; border-radius: 10px">
                            <i class="pi pi-fw pi-shopping-cart !text-2xl text-teal-700"></i>
                        </div>
                        <div class="mt-6 mb-1 text-surface-900 dark:text-surface-0 text-xl font-semibold">Ready to Use</div>
                        <span class="text-surface-600 dark:text-surface-200">Mauris sit amet massa vitae.</span>
                    </div>
                </div>
            </div>

            <div class="col-span-12 md:col-span-12 lg:col-span-4 p-0 lg:pr-8 mt-6 lg:mt-0">
                <div style="height: 160px; padding: 2px; border-radius: 10px; background: linear-gradient(90deg, rgba(145, 210, 204, 0.2), rgba(212, 162, 221, 0.2)), linear-gradient(180deg, rgba(251, 199, 145, 0.2), rgba(160, 210, 250, 0.2))">
                    <div class="p-4 bg-surface-0 dark:bg-surface-900 h-full" style="border-radius: 8px">
                        <div class="flex items-center justify-center bg-blue-200 mb-4" style="width: 3.5rem; height: 3.5rem; border-radius: 10px">
                            <i class="pi pi-fw pi-globe !text-2xl text-blue-700"></i>
                        </div>
                        <div class="mt-6 mb-1 text-surface-900 dark:text-surface-0 text-xl font-semibold">Modern Practices</div>
                        <span class="text-surface-600 dark:text-surface-200">Elementum nibh tellus molestie nunc non.</span>
                    </div>
                </div>
            </div>

            <div class="col-span-12 md:col-span-12 lg:col-span-4 p-0 lg-4 mt-6 lg:mt-0">
                <div style="height: 160px; padding: 2px; border-radius: 10px; background: linear-gradient(90deg, rgba(160, 210, 250, 0.2), rgba(212, 162, 221, 0.2)), linear-gradient(180deg, rgba(246, 158, 188, 0.2), rgba(212, 162, 221, 0.2))">
                    <div class="p-4 bg-surface-0 dark:bg-surface-900 h-full" style="border-radius: 8px">
                        <div class="flex items-center justify-center bg-purple-200 mb-4" style="width: 3.5rem; height: 3.5rem; border-radius: 10px">
                            <i class="pi pi-fw pi-eye !text-2xl text-purple-700"></i>
                        </div>
                        <div class="mt-6 mb-1 text-surface-900 dark:text-surface-0 text-xl font-semibold">Privacy</div>
                        <span class="text-surface-600 dark:text-surface-200">Neque egestas congue quisque.</span>
                    </div>
                </div>
            </div> 


            

            <div
                class="col-span-12 mt-20 mb-20 p-2 md:p-20"
                style="border-radius: 20px; background: var(--background-light)"
            >
                <div class="flex flex-col justify-center items-center text-center px-4 py-4 md:py-0">
                    <div class="text-[var(--text-light)] mb-2 text-3xl font-semibold">Joséphine Miller</div>
                    <span class="text-[var(--text-light)] text-2xl">Peak Interactive</span>
                    <p class="text-[var(--text-light)] sm:line-height-2 md:line-height-4 text-2xl mt-6" style="max-width: 800px">
                        “Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.”
                    </p>
                    <img src="https://primefaces.org/cdn/templates/sakai/landing/peak-logo.svg" class="mt-6" alt="Company logo" />
                </div>
            </div>
        </div>
    </div> -->
    
    
    <div class="py-12 dark:bg-[var(--background)] text-[var(--text-light)] sm:py-12 lg:py-16">
        <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div class="relative mx-auto max-w-7xl px-6 text-center lg:px-8 mb-10">
                <div class="mx-auto max-w-2xl lg:max-w-4xl">
                <h2 class="text-lg font-semibold leading-8 text-[var(--primary)] dark:text-[var(--primary)]">Features</h2>
                <p class="mt-2 text-4xl font-bold tracking-tight text-[var(--text-light)] dark:text-[var(--text-light)]">Features..</p>
                </div>
            </div>
            <div
                class="grid max-w-4xl lg:max-w-6xl grid-cols-1 mx-auto mt-8 text-center gap-y-4 sm:gap-x-8 sm:grid-cols-2 lg:grid-cols-3 sm:mt-12 lg:mt-20 sm:text-left">
                <div class="relative">
                    <div class="absolute -inset-1">
                        <div
                            class="w-full h-full rotate-180 opacity-30 blur-lg filter bg-gradient-to-r from-[var(--primary)] via-[var(--primary)] to-[var(--primary)]">
                        </div>
                    </div>
                    <div class="relative overflow-hidden bg-[var(--background-light)] shadow-md rounded-xl h-full">
                        <div class="p-9"><svg class="w-12 h-12 mx-auto text-[var(--text-light)] sm:mx-0" viewBox="0 0 24 24"
                                fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11 8L20 8" style="stroke: var(--primary);" stroke-width="2" stroke-linecap="round"></path>
                                <path d="M4 16L14 16" style="stroke: var(--primary);" stroke-width="2" stroke-linecap="round"></path>
                                <ellipse cx="7" cy="8" rx="3" ry="3" transform="rotate(90 7 8)" style="stroke: var(--primary);"
                                    stroke-width="2" stroke-linecap="round"></ellipse>
                                <ellipse cx="17" cy="16" rx="3" ry="3" transform="rotate(90 17 16)" style="stroke: var(--primary);"
                                    stroke-width="2" stroke-linecap="round"></ellipse>
                            </svg>
                            <h3 class="mt-6 text-2xl font-bold text-[var(--text-light)] sm:mt-10">Realtime Collaboration</h3>
                            <p class="mt-6 text-base text-[var(--text-light)]">Collaborate in realtime with other editors in a
                                project. See what othe editors are doing and edit even a simple text together</p>
                        </div>
                    </div>
                </div>
                <div class="overflow-hidden bg-[var(--background-light)] shadow-md rounded-xl">
                    <div class="p-9"><svg class="w-12 h-12 mx-auto text-gray-400 sm:mx-0" viewBox="0 0 24 24" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <rect x="13" y="14" width="2" height="2" rx="1" style="fill: var(--primary);"></rect>
                            <rect x="7" y="11" width="2" height="6" rx="1" style="fill: var(--primary);"></rect>
                            <rect x="11" y="13" width="2" height="6" rx="1" transform="rotate(90 11 13)" style="fill: var(--primary);">
                            </rect>
                            <rect x="16" y="12" width="2" height="2" rx="1" style="fill: var(--primary);"></rect>
                            <path
                                d="M14 8V8C14 7.58326 14 7.37488 13.9655 7.19144C13.8455 6.5546 13.4245 6.01534 12.8358 5.74455C12.6662 5.66654 12.464 5.616 12.0597 5.51493L12 5.5C11.5388 5.3847 11.3082 5.32706 11.1171 5.233C10.5686 4.96315 10.1737 4.45731 10.0449 3.85979C10 3.65151 10 3.41382 10 2.93845V2"
                                style="stroke: var(--primary);" stroke-width="2" stroke-linecap="round"></path>
                            <path
                                d="M3 14C3 11.4412 3 10.1618 3.61994 9.28042C3.77954 9.05351 3.96572 8.85041 4.17372 8.6763C4.98164 8 6.15442 8 8.5 8H15.5C17.8456 8 19.0184 8 19.8263 8.6763C20.0343 8.85041 20.2205 9.05351 20.3801 9.28042C21 10.1618 21 11.4412 21 14C21 16.5588 21 17.8382 20.3801 18.7196C20.2205 18.9465 20.0343 19.1496 19.8263 19.3237C19.0184 20 17.8456 20 15.5 20H8.5C6.15442 20 4.98164 20 4.17372 19.3237C3.96572 19.1496 3.77954 18.9465 3.61994 18.7196C3 17.8382 3 16.5588 3 14Z"
                                style="stroke: var(--primary);" stroke-width="2"></path>
                        </svg>
                        <h3 class="mt-6 text-2xl font-bold text-[var(--text-light)] sm:mt-10">History of Edits</h3>
                        <p class="mt-6 text-base text-[var(--text-light)]">Go back and forth your history of changes and
                            restore your designs to any point in time</p>
                    </div>
                </div>
                <div class="relative">
                    <div class="absolute -inset-1">
                        <div
                            class="w-full h-full rotate-180 opacity-30 blur-lg filter bg-gradient-to-r from-[var(--primary)] via-[var(--primary)] to-[var(--primary)]">
                        </div>
                    </div>
                    <div class="relative overflow-hidden bg-[var(--background-light)] shadow-md rounded-xl h-full">
                        <div class="p-9"><svg class="w-12 h-12 mx-auto text-gray-400 sm:mx-0" viewBox="0 0 24 24"
                                fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11 8L20 8" style="stroke: var(--primary);" stroke-width="2" stroke-linecap="round"></path>
                                <path d="M4 16L14 16" style="stroke: var(--primary);" stroke-width="2" stroke-linecap="round"></path>
                                <ellipse cx="7" cy="8" rx="3" ry="3" transform="rotate(90 7 8)" style="stroke: var(--primary);"
                                    stroke-width="2" stroke-linecap="round"></ellipse>
                                <ellipse cx="17" cy="16" rx="3" ry="3" transform="rotate(90 17 16)" style="stroke: var(--primary);"
                                    stroke-width="2" stroke-linecap="round"></ellipse>
                            </svg>
                            <h3 class="mt-6 text-2xl font-bold text-[var(--text-light)] sm:mt-10">Integrations</h3>
                            <p class="mt-6 text-base text-[var(--text-light)]">Step up your designs and workflow with
                                integrations with your favourite tools such as mailchimp, slack, jira etc</p>
                        </div>
                    </div>
                </div>
                <div class="overflow-hidden bg-[var(--background-light)] shadow-md rounded-xl">
                    <div class="p-9"><svg class="w-12 h-12 mx-auto text-gray-400 sm:mx-0" viewBox="0 0 24 24" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <rect x="13" y="14" width="2" height="2" rx="1" style="fill: var(--primary);"></rect>
                            <rect x="7" y="11" width="2" height="6" rx="1" style="fill: var(--primary);"></rect>
                            <rect x="11" y="13" width="2" height="6" rx="1" transform="rotate(90 11 13)" style="fill: var(--primary);">
                            </rect>
                            <rect x="16" y="12" width="2" height="2" rx="1" style="fill: var(--primary);"></rect>
                            <path
                                d="M14 8V8C14 7.58326 14 7.37488 13.9655 7.19144C13.8455 6.5546 13.4245 6.01534 12.8358 5.74455C12.6662 5.66654 12.464 5.616 12.0597 5.51493L12 5.5C11.5388 5.3847 11.3082 5.32706 11.1171 5.233C10.5686 4.96315 10.1737 4.45731 10.0449 3.85979C10 3.65151 10 3.41382 10 2.93845V2"
                                style="stroke: var(--primary);" stroke-width="2" stroke-linecap="round"></path>
                            <path
                                d="M3 14C3 11.4412 3 10.1618 3.61994 9.28042C3.77954 9.05351 3.96572 8.85041 4.17372 8.6763C4.98164 8 6.15442 8 8.5 8H15.5C17.8456 8 19.0184 8 19.8263 8.6763C20.0343 8.85041 20.2205 9.05351 20.3801 9.28042C21 10.1618 21 11.4412 21 14C21 16.5588 21 17.8382 20.3801 18.7196C20.2205 18.9465 20.0343 19.1496 19.8263 19.3237C19.0184 20 17.8456 20 15.5 20H8.5C6.15442 20 4.98164 20 4.17372 19.3237C3.96572 19.1496 3.77954 18.9465 3.61994 18.7196C3 17.8382 3 16.5588 3 14Z"
                                style="stroke: var(--primary);" stroke-width="2"></path>
                        </svg>
                        <h3 class="mt-6 text-2xl font-bold text-[var(--text-light)] sm:mt-10">Publish webpage online</h3>
                        <p class="mt-6 text-base text-[var(--text-light)]">Effortlessly publish your webpages online and make
                            it available to the world with a click of a button</p>
                    </div>
                </div>
                <div class="relative">
                    <div class="absolute -inset-1">
                        <div
                            class="w-full h-full rotate-180 opacity-30 blur-lg filter bg-gradient-to-r from-[var(--primary)] via-[var(--primary)] to-[var(--primary)]">
                        </div>
                    </div>
                    <div class="relative overflow-hidden bg-[var(--background-light)] shadow-md rounded-xl h-full">
                        <div class="p-9"><svg class="w-12 h-12 mx-auto text-gray-400 sm:mx-0" viewBox="0 0 24 24"
                                fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11 8L20 8" style="stroke: var(--primary);" stroke-width="2" stroke-linecap="round"></path>
                                <path d="M4 16L14 16" style="stroke: var(--primary);" stroke-width="2" stroke-linecap="round"></path>
                                <ellipse cx="7" cy="8" rx="3" ry="3" transform="rotate(90 7 8)" style="stroke: var(--primary);"
                                    stroke-width="2" stroke-linecap="round"></ellipse>
                                <ellipse cx="17" cy="16" rx="3" ry="3" transform="rotate(90 17 16)" style="stroke: var(--primary);"
                                    stroke-width="2" stroke-linecap="round"></ellipse>
                            </svg>
                            <h3 class="mt-6 text-2xl font-bold text-[var(--text-light)] sm:mt-10">Forms and Data Collection
                            </h3>
                            <p class="mt-6 text-base text-[var(--text-light)]">Collect data and information from users with
                                forms built on windframe and sort through them in a nice interface</p>
                        </div>
                    </div>
                </div>
                <div class="overflow-hidden bg-[var(--background-light)] shadow-md rounded-xl">
                    <div class="p-9"><svg class="w-12 h-12 mx-auto text-gray-400 sm:mx-0" viewBox="0 0 24 24" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <rect x="13" y="14" width="2" height="2" rx="1" style="fill: var(--primary);"></rect>
                            <rect x="7" y="11" width="2" height="6" rx="1" style="fill: var(--primary);"></rect>
                            <rect x="11" y="13" width="2" height="6" rx="1" transform="rotate(90 11 13)" style="fill: var(--primary);">
                            </rect>
                            <rect x="16" y="12" width="2" height="2" rx="1" style="fill: var(--primary);"></rect>
                            <path
                                d="M14 8V8C14 7.58326 14 7.37488 13.9655 7.19144C13.8455 6.5546 13.4245 6.01534 12.8358 5.74455C12.6662 5.66654 12.464 5.616 12.0597 5.51493L12 5.5C11.5388 5.3847 11.3082 5.32706 11.1171 5.233C10.5686 4.96315 10.1737 4.45731 10.0449 3.85979C10 3.65151 10 3.41382 10 2.93845V2"
                                style="stroke: var(--primary);" stroke-width="2" stroke-linecap="round"></path>
                            <path
                                d="M3 14C3 11.4412 3 10.1618 3.61994 9.28042C3.77954 9.05351 3.96572 8.85041 4.17372 8.6763C4.98164 8 6.15442 8 8.5 8H15.5C17.8456 8 19.0184 8 19.8263 8.6763C20.0343 8.85041 20.2205 9.05351 20.3801 9.28042C21 10.1618 21 11.4412 21 14C21 16.5588 21 17.8382 20.3801 18.7196C20.2205 18.9465 20.0343 19.1496 19.8263 19.3237C19.0184 20 17.8456 20 15.5 20H8.5C6.15442 20 4.98164 20 4.17372 19.3237C3.96572 19.1496 3.77954 18.9465 3.61994 18.7196C3 17.8382 3 16.5588 3 14Z"
                                style="stroke: var(--primary);" stroke-width="2"></path>
                        </svg>
                        <h3 class="mt-6 text-2xl font-bold text-[var(--text-light)] sm:mt-10">Custom Domains</h3>
                        <p class="mt-6 text-base text-[var(--text-light)]">Attach your own custom domain to your published
                            projects or website on windframe</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `
})
export class FeaturesWidget {}
