import { Component, inject, signal } from '@angular/core';

import { HlmCardImports } from '@spartan-ng/helm/card';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Component({
  selector: 'app-privacy-banner',
  imports: [HlmCardImports, HlmButtonImports, TranslatePipe],
  templateUrl: './privacy-banner.html',
  styleUrl: './privacy-banner.css',
})
export class PrivacyBanner {
  private translateService = inject(TranslateService);

  showPrivacyBanner = signal(true);
  language = toSignal(
    this.translateService.onLangChange.pipe<'it' | 'en'>(
      map((event) => event.lang as keyof { it: string; en: string }),
    ),
    {
      initialValue: 'it' as keyof { it: string; en: string },
    },
  );

  hidePrivacyBanner = () => this.showPrivacyBanner.set(false);
}
