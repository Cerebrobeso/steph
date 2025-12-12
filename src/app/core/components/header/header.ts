import { Component, input, effect, inject } from '@angular/core';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { HlmButton } from '@spartan-ng/helm/button';

@Component({
  selector: 'app-header',
  imports: [HlmButton],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  activeSection = input('about');
  private platformId = inject(PLATFORM_ID);

  constructor() {
    effect(() => {
      if (isPlatformBrowser(this.platformId)) {
        const section = this.activeSection();
        this.scrollToActiveButton(section);
      }
    });
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  private scrollToActiveButton(sectionId: string): void {
    // Solo su mobile (larghezza < 768px, corrispondente al breakpoint md di Tailwind)
    if (window.innerWidth < 768) {
      const button = document.querySelector(`button[data-section="${sectionId}"]`);
      if (button) {
        button.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    }
  }
}
