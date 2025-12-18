import {TranslateLoader} from '@ngx-translate/core';
import {makeStateKey, StateKey, TransferState} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

export class TranslateBrowserLoader implements TranslateLoader {
  env = environment;

  constructor(
    private http: HttpClient,
    private transferState: TransferState,
    private prefix = './i18n/',
    private suffix = '.json'
  ) {
  }

  getTranslation(lang: string): Observable<any> {
    const key: StateKey<any> = makeStateKey<any>('transfer-translate-' + lang);
    const data = this.transferState.get(key, null);
    if (!this.env.production) {
      this.prefix = './public/i18n/';
    }

    if (data) {
      return new Observable((observer) => {
        observer.next(data);
        observer.complete();
      });
    }
    const url = `${this.prefix}${lang}${this.suffix}`;
    return this.http.get<any>(url);
  }
}

export function translateBrowserLoaderFactory(
  httpClient: HttpClient,
  transferState: TransferState
) {
  return new TranslateBrowserLoader(httpClient, transferState);
}
