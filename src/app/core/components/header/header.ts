import { Component, input, effect, inject, model, signal } from '@angular/core';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { HlmButton } from '@spartan-ng/helm/button';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { flagIt, flagGb } from '@ng-icons/flag-icons';
import { HlmDropdownMenuImports } from '@spartan-ng/helm/dropdown-menu';
import { HlmMenubarImports } from '@spartan-ng/helm/menubar';
import {BrnPopoverContent, BrnPopoverImports} from '@spartan-ng/brain/popover';
import { HlmPopoverImports } from '@spartan-ng/helm/popover';
import { Sidebar } from "../sidebar/sidebar";
import { lucideCircleUserRound } from '@ng-icons/lucide';
import { BrnTooltipImports } from '@spartan-ng/brain/tooltip';
import { HlmTooltipImports } from '@spartan-ng/helm/tooltip';
import {RouterLink, RouterLinkActive} from '@angular/router';
@Component({
  selector: 'app-header',
  imports: [
    HlmButton, TranslatePipe,
    NgIcon,
    HlmDropdownMenuImports,
    HlmMenubarImports,
    HlmPopoverImports,
    Sidebar,
    BrnPopoverImports,
    HlmTooltipImports,
    BrnTooltipImports, BrnPopoverContent, RouterLink, RouterLinkActive
  ],
  providers: [
    provideIcons({
      flagIt,
      flagGb,
      lucideCircleUserRound
    }),
  ],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  activeSection = model('about');

  currentLanguage = signal('Italiano');
  currentFlag = signal('flagIt');

  private platformId = inject(PLATFORM_ID);
  private translateService = inject(TranslateService)

  constructor() {
    effect(() => {
      if (isPlatformBrowser(this.platformId)) {
        const section = this.activeSection();
        this.scrollToActiveButton(section);
      }
    });
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = -112;
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;

      window.scrollTo({top: y, behavior: 'smooth'});
      setTimeout(() => {
        document.querySelectorAll('.main-content section').forEach(section => section.classList.remove('in-view'));
      }, 100)

      setTimeout(() => {
        this.activeSection.set(sectionId);
        element.classList.add('in-view');
      }, 100)
    }
  }

  private scrollToActiveButton(sectionId: string): void {
    // Solo su mobile (larghezza < 768px, corrispondente al breakpoint md di Tailwind)
    if (window.innerWidth < 768) {
      const button = document.querySelector(`button[data-section="${sectionId}"]`);
      if (button) {
        button.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    }
  }

  changeLanguage(locale: string) {
    this.translateService.use(locale);
    if (locale === 'it') {
      this.currentLanguage.set('Italiano');
      this.currentFlag.set('flagIt');
    } else {
      this.currentLanguage.set('English');
      this.currentFlag.set('flagGb');
    }
  }
}
