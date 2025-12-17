import {mergeApplicationConfig, ApplicationConfig, TransferState} from '@angular/core';
import { provideServerRendering, withRoutes } from '@angular/ssr';
import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';
import {provideTranslateService, TranslateLoader} from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { provideHttpClient } from '@angular/common/http';
import {translateServerLoaderFactory} from './shared/services/translate-server.loader';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(withRoutes(serverRoutes)),
    provideHttpClient(),
    provideTranslateService({
      loader: {
        provide: TranslateLoader,
        useFactory: translateServerLoaderFactory,
        deps: [TransferState]
      },
      fallbackLang: 'it',
      lang: 'it',
    }),
  ],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
