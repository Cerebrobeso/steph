import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import {SeoService} from './shared/services/seo.service';
import {jsonLd, seoData} from './data/seo.data';
import {JsonLdService} from './shared/services/json-ld.service';
import { HlmToaster } from '@spartan-ng/helm/sonner';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HlmToaster],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private translate = inject(TranslateService);
  private seo = inject(SeoService);
  private jsonLd = inject(JsonLdService);

  protected readonly title = signal('steph');
  protected readonly seoData = seoData;
  protected readonly jsonLdData = jsonLd;

  constructor() {
    this.translate.addLangs(['it', 'en']);
    this.translate.setFallbackLang('it');
    this.translate.use('it');

    this.seo.setMetaTags(this.seoData);
    this.jsonLd.insertSchema(this.jsonLdData);
  }
}
