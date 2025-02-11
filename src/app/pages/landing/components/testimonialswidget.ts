import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'testimonials-widget',
    standalone: true,
    imports: [CommonModule],
    template: `
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">

        <div id="testimonials" class="p-14 mt-0 mx-auto md:pb-20 max-w-7xl">
            <div class="relative mb-10  mx-auto max-w-7xl px-6 text-center lg:px-8">
                <div class="mx-auto max-w-2xl lg:max-w-4xl">
                <h2 class="text-lg font-semibold leading-8 text-[var(--primary)] dark:text-[var(--primary)]">Testimonials</h2>
                <p class="mt-2 text-4xl font-bold tracking-tight text-[var(--text-light)] dark:text-[var(--text-light)]">Testimonials..</p>
                </div>
            </div>

            <div class="gap-8 space-y-8 md:columns-2 lg:columns-3">
                <div class="p-8 bg-[var(--background-light)] border border-[var(--background-light)]  shadow-2xl aspect-auto rounded-3xl shadow-[var(--primary-shadow)] ">
                    <div class="flex gap-4 items-start">
                        <img class="w-12 h-12 rounded-full" src="https://randomuser.me/api/portraits/men/12.jpg" alt="user avatar" width="400" height="400" loading="lazy">
                        <div class="flex-1 flex justify-between items-start">
                            <div>
                                <h6 class="text-lg font-medium text-[var(--text-light)] ">Ravi Kumar</h6>
                                <p class="text-sm text-[var(--text-light)] ">Car Enthusiast</p>
                            </div>
                            <a href="https://twitter.com/ravikumar/status/1234567890"
                                class="text-[var(--primary)] hover:text-[var(--primary)] ml-4">
                                <i class="fab fa-twitter bg-transparent"></i>
                            </a>
                        </div>
                    </div>
                    <p class="mt-8 text-[var(--text-light)]">The quality of these seat covers is outstanding. They fit perfectly and add a touch of
                        luxury to
                        my car's interior. Highly recommend!</p>
                </div>

                <div class="p-8 bg-[var(--background-light)] border border-[var(--background-light)] shadow-2xl aspect-auto rounded-3xl shadow-[var(--primary-shadow)] ">
                    <div class="flex gap-4 items-start">
                        <img class="w-12 h-12 rounded-full" src="https://randomuser.me/api/portraits/women/14.jpg" alt="user avatar" width="200" height="200" loading="lazy">
                        <div class="flex-1 flex justify-between items-start">
                            <div>
                                <h6 class="text-lg font-medium text-[var(--text-light)] ">Anjali Sharma</h6>
                                <p class="text-sm text-[var(--text-light)]">Marketing Professional</p>
                            </div>
                            <a href="https://www.instagram.com/p/1234567890" 
                                class="text-[var(--primary)] hover:text-[var(--primary)] ml-4">
                                <i class="fab fa-instagram"></i>
                            </a>
                        </div>
                    </div>
                    <p class="mt-8 text-[var(--text-light)]">I love the customizable designs! I was able to choose the perfect color to match my car's
                        interior. The material feels very durable.</p>
                </div>

                <div class="p-8 bg-[var(--background-light)] border border-[var(--background-light)]  shadow-2xl aspect-auto rounded-3xl shadow-[var(--primary-shadow)] ">
                    <div class="flex gap-4 items-start">
                        <img class="w-12 h-12 rounded-full" src="https://randomuser.me/api/portraits/men/18.jpg" alt="user avatar" width="200" height="200" loading="lazy">
                        <div class="flex-1 flex justify-between items-start">
                            <div>
                                <h6 class="text-lg font-medium text-[var(--text-light)]">Vijay Singh</h6>
                                <p class="text-sm text-[var(--text-light)]">Software Developer</p>
                            </div>
                            <a href="https://www.facebook.com/vijaysingh/posts/1234567890"
                                class="text-[var(--primary)] hover:text-[var(--primary)] ml-4">
                                <i class="fab fa-facebook"></i>
                            </a>
                        </div>
                    </div>
                    <p class="mt-8 text-[var(--text-light)]">These seat covers are a game-changer for long drives. The added padding and ergonomic design
                        make
                        a huge difference in comfort.</p>
                </div>

            </div>
        </div>
    `
})
export class TestimonialsWidget {}
