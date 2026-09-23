import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class JsonLdService {
  private document = inject(DOCUMENT);
  private platformId = inject(PLATFORM_ID);

  insertSchema(schema: Record<string, unknown>, className = 'structured-data') {
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

  private addScript(schema: Record<string, unknown>, className: string) {
    const script = this.document.createElement('script');
    script.type = 'application/ld+json';
    script.className = className;
    script.textContent = JSON.stringify(schema);
    this.document.head.appendChild(script);
  }
}
