import { Component, input } from '@angular/core';
import { HlmButton } from '@spartan-ng/helm/button';

@Component({
  selector: 'app-header',
  imports: [HlmButton],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  activeSection = input('about');

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
