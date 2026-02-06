import { Routes } from '@angular/router';
import { App } from './app';

export const routes: Routes = [
  {
    path: '',
    component: App,
    children: [
      {
        path: '',
        loadChildren: () => import('./features/home/home.routes').then((m) => m.homeRoutes),
      },
      {
        path: 'privacy-policy-it',
        loadChildren: () => import('./features/privacy-policy/privacy-page-it/privacy-page.routes').then(m => m.privacyPageRoutes)
      },
      {
        path: 'privacy-policy-en',
        loadChildren: () => import('./features/privacy-policy/privacy-page-en/privacy-page.routes').then(m => m.privacyPageRoutes)
      }
    ],
  },
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
