import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class JsonLdService {

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  insertSchema(schema: any, className = 'structured-data') {
    // Verifica se siamo nel browser o durante SSG
    if (!isPlatformBrowser(this.platformId)) {
      // Durante SSG, aggiungi sempre
      this.addScript(schema, className);
    } else {
      const existing = this.document.head.querySelector(`script.${className}`);
      if (existing) {
        return;
      }
      this.addScript(schema, className);
    }
  }

  private addScript(schema: any, className: string) {
    const script = this.document.createElement('script');
    script.type = 'application/ld+json';
    script.className = className;
    script.textContent = JSON.stringify(schema);
    this.document.head.appendChild(script);
  }
}
