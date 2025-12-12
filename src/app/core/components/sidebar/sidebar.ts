import { Component } from '@angular/core';
import {HlmSidebarImports} from '@spartan-ng/helm/sidebar';
import {NgIcon, provideIcons} from '@ng-icons/core';
import {HlmIcon} from '@spartan-ng/helm/icon';
import {
  lucideMail,
  lucidePhone,
  lucideMapPin,
  lucideLinkedin,
  lucideGithub,
  lucideInstagram
} from '@ng-icons/lucide';

@Component({
  selector: 'app-sidebar',
  imports: [NgIcon, HlmIcon],
  providers: [provideIcons({
    lucideMail,
    lucidePhone,
    lucideMapPin,
    lucideLinkedin,
    lucideGithub,
    lucideInstagram
  })],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {

}
