import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import 'overlayscrollbars/overlayscrollbars.css';
import {OverlayScrollbars} from 'overlayscrollbars';

bootstrapApplication(App, appConfig).catch((err) => console.error(err));

OverlayScrollbars(document.body, {
  scrollbars: {
    autoHide: 'move',
    theme: 'os-theme-dark',
  }
});
