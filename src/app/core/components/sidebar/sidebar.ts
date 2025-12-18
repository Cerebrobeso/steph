import { Component, inject } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { HlmIcon } from '@spartan-ng/helm/icon';
import {
  lucideCopy,
  lucideGithub,
  lucideInstagram,
  lucideLinkedin,
  lucideMail,
  lucideMapPin,
  lucidePhone,
  lucideSend,
} from '@ng-icons/lucide';
import { portfolioData } from '../../../data/portfolio.data';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { CdkCopyToClipboard } from '@angular/cdk/clipboard';
import { HlmMenubarTrigger } from '@spartan-ng/helm/menubar';
import { HlmTooltipImports } from '@spartan-ng/helm/tooltip';
import { toast } from 'ngx-sonner';
import { HlmToasterImports } from '@spartan-ng/helm/sonner';

@Component({
  selector: 'app-sidebar',
  imports: [
    NgIcon,
    HlmIcon,
    TranslatePipe,
    HlmButtonImports,
    CdkCopyToClipboard,
    HlmMenubarTrigger,
    HlmTooltipImports,
    HlmToasterImports,
  ],
  providers: [
    provideIcons({
      lucideMail,
      lucidePhone,
      lucideMapPin,
      lucideLinkedin,
      lucideGithub,
      lucideInstagram,
      lucideCopy,
      lucideSend,
    }),
  ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  private translateService = inject(TranslateService);
  public data = portfolioData;

  language = toSignal(
    this.translateService.onLangChange.pipe<'it' | 'en'>(
      map((event) => event.lang as keyof { it: string; en: string }),
    ),
    {
      initialValue: 'it' as keyof { it: string; en: string },
    },
  );
  constructor() {
    /* empty */
  }

  onCopied(success: boolean) {
    if (success) {
      toast(this.translateService.instant('misc.copied'), {});
    }
  }
}
