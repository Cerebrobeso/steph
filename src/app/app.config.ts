import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
  TransferState
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import {provideTranslateService, TranslateLoader, TranslateService} from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import {HttpClient, provideHttpClient, withFetch} from '@angular/common/http';
import {TranslateServerLoader, translateServerLoaderFactory} from './shared/services/translate-server.loader';
import {translateBrowserLoaderFactory} from './shared/services/translate-client.loader';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch()),
    provideTranslateService({
      loader: {
        provide: TranslateLoader,
        useFactory: translateBrowserLoaderFactory,
        deps: [HttpClient, TransferState]
      },
      fallbackLang: 'it',
      lang: 'it',
    }),
  ],
};
