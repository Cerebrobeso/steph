import {ApplicationConfig, provideBrowserGlobalErrorListeners, TransferState} from '@angular/core';
import {provideRouter, withHashLocation} from '@angular/router';

import {routes} from './app.routes';
import {provideClientHydration, withEventReplay} from '@angular/platform-browser';
import {provideTranslateService, TranslateLoader} from '@ngx-translate/core';
import {HttpClient, provideHttpClient, withFetch} from '@angular/common/http';
import {translateBrowserLoaderFactory} from './shared/services/translate-client.loader';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withHashLocation()),
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
