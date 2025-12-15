// translate-browser.loader.ts
import { TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { makeStateKey, StateKey, TransferState } from '@angular/core'; // ✓ Corretto
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export class TranslateBrowserLoader implements TranslateLoader {
  constructor(
    private http: HttpClient, 
    private transferState: TransferState,
    private prefix = '/assets/i18n/',
    private suffix = '.json'
  ) {}
  
  getTranslation(lang: string): Observable<any> {
    const key: StateKey<any> = makeStateKey<any>('transfer-translate-' + lang);
    const data = this.transferState.get(key, null);
    
    if (data) {
      return new Observable((observer) => {
        observer.next(data);
        observer.complete();
      });
    }
    return new TranslateHttpLoader()
      .getTranslation(lang);
  }
}
