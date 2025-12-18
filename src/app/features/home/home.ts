import {Component, effect, inject, signal} from '@angular/core';
import {NgIcon, provideIcons} from '@ng-icons/core';
import {
  lucideCheck,
  lucideCheckCheck, lucideCheckCircle,
  lucideCircle,
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


@Component({
  selector: 'app-home',
  imports: [NgIcon, HlmIcon, Sidebar, Header, InViewDirective, TranslatePipe],
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
      lucideCheckCircle
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
}
