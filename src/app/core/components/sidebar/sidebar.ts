import {Component, inject} from '@angular/core';
import { HlmSidebarImports } from '@spartan-ng/helm/sidebar';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { HlmIcon } from '@spartan-ng/helm/icon';
import {
  lucideMail,
  lucidePhone,
  lucideMapPin,
  lucideLinkedin,
  lucideGithub,
  lucideInstagram,
} from '@ng-icons/lucide';
import { portfolioData } from '../../../data/portfolio.data';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {toSignal} from '@angular/core/rxjs-interop';
import {map} from 'rxjs';

@Component({
  selector: 'app-sidebar',
  imports: [NgIcon, HlmIcon, TranslatePipe],
  providers: [
    provideIcons({
      lucideMail,
      lucidePhone,
      lucideMapPin,
      lucideLinkedin,
      lucideGithub,
      lucideInstagram,
    }),
  ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  private translateService = inject(TranslateService);
  public data = portfolioData;

  language = toSignal(
    this.translateService.onLangChange.pipe<"it" | "en">(
      map(event => event.lang as keyof { it: string; en: string; })
    ),
    {
      initialValue: 'it' as keyof { it: string; en: string; },
    }
  );
  constructor() {}
}
