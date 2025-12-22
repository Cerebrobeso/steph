import {Component, effect, inject, signal} from '@angular/core';
import {NgIcon, provideIcons} from '@ng-icons/core';
import {
  lucideCheck,
  lucideCheckCheck, lucideCheckCircle,
  lucideCircle, lucideCircleUserRound,
  lucideGithub,
  lucideLinkedin,
  lucideMail,
  lucideMapPin,
  lucidePhone,
} from '@ng-icons/lucide';
import {HlmIcon} from '@spartan-ng/helm/icon';
import {Sidebar} from '../../core/components/sidebar/sidebar';
import {Header} from '../../core/components/header/header';
import {InViewDirective} from '../../shared/directives/inview.directive';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {map} from 'rxjs';
import {toSignal} from '@angular/core/rxjs-interop';
import {portfolioData} from '../../data/portfolio.data';
import {HlmItemImports} from '@spartan-ng/helm/item';
import {HlmButtonImports} from '@spartan-ng/helm/button';
import {HlmSheet, HlmSheetContent, HlmSheetTrigger} from '@spartan-ng/helm/sheet';
import {BrnSheetContent} from '@spartan-ng/brain/sheet';


@Component({
  selector: 'app-home',
  imports: [NgIcon, HlmIcon, Sidebar, Header, InViewDirective, TranslatePipe, HlmItemImports, HlmButtonImports, HlmSheetTrigger, HlmSheet, BrnSheetContent, HlmSheetContent],
  providers: [
    provideIcons({
      lucideMail,
      lucidePhone,
      lucideMapPin,
      lucideLinkedin,
      lucideGithub,
      lucideCircle,
      lucideCheck,
      lucideCheckCheck,
      lucideCheckCircle,
      lucideCircleUserRound
    }),
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private translateService = inject(TranslateService);

  activeSection = signal<string>('about');
  language = toSignal(
    this.translateService.onLangChange.pipe<"it" | "en">(
      map(event => event.lang as keyof { it: string; en: string; })
    ),
    {
      initialValue: 'it' as keyof { it: string; en: string; },
    }
  );

  constructor() {}


  onSectionInView(sectionId: any, isInView: boolean) {
    if (isInView) {
      this.activeSection.set(sectionId);
    }
  }

  protected readonly portfolioData = portfolioData;
  protected readonly data = portfolioData;
}
