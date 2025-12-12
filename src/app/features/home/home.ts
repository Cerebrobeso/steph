import { Component } from '@angular/core';
import { HlmSidebarImports } from '@spartan-ng/helm/sidebar';
import {NgIcon, provideIcons} from '@ng-icons/core';
import {
  lucideMail,
  lucidePhone,
  lucideMapPin,
  lucideLinkedin,
  lucideGithub,
  lucideCircle} from '@ng-icons/lucide';
import {HlmIcon} from '@spartan-ng/helm/icon';
import {Sidebar} from '../../core/components/sidebar/sidebar';
import {Header} from '../../core/components/header/header';

@Component({
  selector: 'app-home',
  imports: [HlmSidebarImports, NgIcon, HlmIcon, Sidebar, Header],
  providers: [provideIcons({
    lucideMail,
    lucidePhone,
    lucideMapPin,
    lucideLinkedin,
    lucideGithub,
    lucideCircle
  })],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

  constructor() {}
}
