import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideCopy,
  lucideMail,
  lucideMapPin,
  lucidePhone,
  lucideSend,
  lucideShieldCheck,
} from '@ng-icons/lucide';
import { simpleGithub, simpleInstagram } from '@ng-icons/simple-icons';
import { simpleLinkedin } from '../../../shared/icons/simple-linkedin';
import { portfolioData } from '../../../data/portfolio.data';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { CdkCopyToClipboard } from '@angular/cdk/clipboard';
import { HlmTooltipImports } from '@spartan-ng/helm/tooltip';
import { toast } from '@spartan-ng/brain/sonner';

@Component({
  selector: 'app-sidebar',
  imports: [
    NgIcon,
    TranslatePipe,
    HlmButtonImports,
    CdkCopyToClipboard,
    HlmTooltipImports,
  ],
  providers: [
    provideIcons({
      lucideMail,
      lucidePhone,
      lucideMapPin,
      lucideCopy,
      lucideSend,
      lucideShieldCheck,
      simpleLinkedin,
      simpleGithub,
      simpleInstagram,
    }),
  ],
  templateUrl: './sidebar.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './sidebar.css',
})
export class Sidebar {
  public data = portfolioData;
  private translateService = inject(TranslateService);
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
