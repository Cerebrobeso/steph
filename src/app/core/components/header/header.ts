import {afterRenderEffect, Component, effect, HostListener, inject, model, PLATFORM_ID, signal} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';

import {HlmButton} from '@spartan-ng/helm/button';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {NgIcon, provideIcons} from '@ng-icons/core';
import {flagGb, flagIt} from '@ng-icons/flag-icons';
import {HlmDropdownMenuImports} from '@spartan-ng/helm/dropdown-menu';
import {HlmMenubarImports} from '@spartan-ng/helm/menubar';
import {BrnPopoverImports} from '@spartan-ng/brain/popover';
import {Sidebar} from '../sidebar/sidebar';
import {lucideCircleUserRound} from '@ng-icons/lucide';
import {BrnTooltipImports} from '@spartan-ng/brain/tooltip';
import {HlmTooltipImports} from '@spartan-ng/helm/tooltip';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {HlmSheetImports} from '@spartan-ng/helm/sheet';
import {BrnSheetContent} from '@spartan-ng/brain/sheet';
import {portfolioData} from '../../../data/portfolio.data';
import {toSignal} from '@angular/core/rxjs-interop';
import {debounceTime, distinctUntilChanged, fromEvent, map} from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [
    HlmButton,
    TranslatePipe,
    NgIcon,
    HlmDropdownMenuImports,
    HlmMenubarImports,
    Sidebar,
    BrnPopoverImports,
    HlmTooltipImports,
    BrnTooltipImports,
    RouterLink,
    RouterLinkActive,
    HlmSheetImports,
    BrnSheetContent,
  ],
  providers: [
    provideIcons({
      flagIt,
      flagGb,
      lucideCircleUserRound,
    }),
  ],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  activeSection = model('about');

  currentLanguage = signal('Italiano');
  currentFlag = signal('flagIt');

  scroll = fromEvent(window, 'scroll');
  showBtn$ = toSignal(this.scroll.pipe(
    map(() => window.pageYOffset > 200),
    distinctUntilChanged()
  ))
  protected readonly portfolioData = portfolioData;
  private platformId = inject(PLATFORM_ID);
  private translateService = inject(TranslateService);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      afterRenderEffect(() => {
        const language = this.getLanguage();
        if (language) {
          this.changeLanguage(language);
        }
      })
    }
    effect(() => {
      if (isPlatformBrowser(this.platformId)) {
        const section = this.activeSection();
        this.scrollToActiveButton(section);
      }
    });
    effect(() => {
      if (isPlatformBrowser(this.platformId)) {
        console.log(this.showBtn$())
      }
    });
  }

  @HostListener('window:scroll', ['$event']) // for window scroll events
  onScroll(event: any) {
    if (isPlatformBrowser(this.platformId)) {
      console.log(event.target.scrollTop)
      console.log(document.documentElement.scrollTop)
    }
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = -112;
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;

      window.scrollTo({top: y, behavior: 'smooth'});
      setTimeout(() => {
        document
          .querySelectorAll('.main-content section')
          .forEach((section) => section.classList.remove('in-view'));
      }, 100);

      setTimeout(() => {
        this.activeSection.set(sectionId);
        element.classList.add('in-view');
      }, 100);
    }
  }

  changeLanguage(locale: string) {
    console.log(locale)
    this.translateService.use(locale);
    console.log(this.translateService.getCurrentLang(), 'current lang')
    this.saveLanguage(locale);
    if (locale === 'it') {
      this.currentLanguage.set('Italiano');
      this.currentFlag.set('flagIt');
    } else {
      this.currentLanguage.set('English');
      this.currentFlag.set('flagGb');
    }
  }

  saveLanguage(lang: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('user-language', lang);
    }
  }

  getLanguage(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('user-language');
    }
    return null;
  }

  private scrollToActiveButton(sectionId: string): void {
    // Solo su mobile (larghezza < 768px, corrispondente al breakpoint md di Tailwind)
    if (window.innerWidth < 768) {
      const button = document.querySelector(`button[data-section="${sectionId}"]`);
      if (button) {
        button.scrollIntoView({behavior: 'smooth', inline: 'center', block: 'nearest'});
      }
    }
  }
}
