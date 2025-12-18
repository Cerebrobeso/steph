import { Routes } from '@angular/router';
import {App} from './app';

export const routes: Routes = [
  {
    path: '',
    component: App,
    children: [{
      path: '',
      loadChildren: () => import('./features/home/home.routes').then((m) => m.homeRoutes),
    }]
  },
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
