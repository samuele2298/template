import { Component, Renderer2} from '@angular/core';
import { RouterModule } from '@angular/router';
import { RippleModule } from 'primeng/ripple';
import { StyleClassModule } from 'primeng/styleclass';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { TopbarWidget } from './components/topbarwidget.component';
import { HeroWidget } from './components/herowidget';
import { FeaturesWidget } from './components/featureswidget';
import { HighlightsWidget } from './components/highlightswidget';
import { PricingWidget } from './components/pricingwidget';
import { ComparisonWidget } from './components/comparisonwidget';
import { FooterWidget } from './components/footerwidget';
import { TestimonialsWidget } from "./components/testimonialswidget";
import { ImpactWidget } from "./components/impactwidget";
import { BrandWidget } from "./components/brandwidget";
import { WaitlistWidget } from "./components/waitlistwidget";

@Component({
    selector: 'app-landing',
    standalone: true,
    imports: [RouterModule, TopbarWidget, HeroWidget, FeaturesWidget, HighlightsWidget, PricingWidget, ComparisonWidget, FooterWidget, RippleModule, StyleClassModule, ButtonModule, DividerModule, TestimonialsWidget, ImpactWidget, BrandWidget, WaitlistWidget],
    template: `
        <div class="bg-[var(--background)] dark:bg-[var(--background)]"> 
            <div id="home" class="landing-wrapper overflow-hidden">
                <topbar-widget class="py-6 bg-[var(--background)] dark:bg-[var(--background)] px-6 mx-0 md:mx-12 lg:mx-20 lg:px-20 flex items-center justify-between relative lg:static" />
                <hero-widget />
                <brand-widget />
                <features-widget />
                <highlights-widget />
                <impact-widget />
                <testimonials-widget />
                <pricing-widget />
                <comparison-widget />
                <waitlist-widget />
                <footer-widget />
            </div>
        </div>
    `
})
export class Landing {
    constructor(private renderer: Renderer2) {}

    ngOnInit() {
        this.renderer.addClass(document.body, 'app-dark'); // Force add dark mode
    }
}

