import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ClrIconModule } from '@clr/angular';

@Component({
    selector: 'app-theme-toggle',
    templateUrl: './theme-toggle.component.html',
    styleUrls: ['./theme-toggle.component.css'],
    standalone: true,
    imports: [ClrIconModule, RouterLink]
})
export class ThemeToggleComponent {
  darkLightLabel = '';
  darkLightIcon = '';

  constructor() {
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
      document.body.setAttribute('cds-theme', currentTheme);
    }
    if (document.body.getAttribute('cds-theme') === 'light') {
      this.darkLightLabel = 'Dark';
      this.darkLightIcon = 'moon';
    }
    else {
      this.darkLightLabel = 'Light';
      this.darkLightIcon = 'sun';
    }
  }

  toggleTheme() {
    if (document.body.getAttribute('cds-theme') === 'light') {
      localStorage.setItem('theme', 'dark');
      document.body.setAttribute('cds-theme', 'dark');
      this.darkLightLabel = 'Light';
      this.darkLightIcon = 'sun';
    }
    else {
      localStorage.setItem('theme', 'light');
      document.body.setAttribute('cds-theme', 'light');
      this.darkLightLabel = 'Dark';
      this.darkLightIcon = 'moon';
    }
  }
}
