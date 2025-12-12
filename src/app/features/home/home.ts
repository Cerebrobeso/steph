import { Component, inject, signal } from '@angular/core';
import { HlmSidebarImports } from '@spartan-ng/helm/sidebar';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideMail,
  lucidePhone,
  lucideMapPin,
  lucideLinkedin,
  lucideGithub,
  lucideCircle,
} from '@ng-icons/lucide';
import { HlmIcon } from '@spartan-ng/helm/icon';
import { Sidebar } from '../../core/components/sidebar/sidebar';
import { Header } from '../../core/components/header/header';
import { InViewDirective } from '../../shared/directives/inview.directive';
import {OverlayscrollbarsModule} from 'overlayscrollbars-ngx';


@Component({
  selector: 'app-home',
  imports: [OverlayscrollbarsModule, NgIcon, HlmIcon, Sidebar, Header, InViewDirective],
  providers: [
    provideIcons({
      lucideMail,
      lucidePhone,
      lucideMapPin,
      lucideLinkedin,
      lucideGithub,
      lucideCircle,
    }),
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  activeSection = signal<string>('about');

  constructor() {}

  onSectionInView(sectionId: string, isInView: boolean) {
    if (isInView) {
      this.activeSection.set(sectionId);
    }
  }
}
