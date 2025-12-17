import { TranslateLoader } from '@ngx-translate/core';
import { makeStateKey, StateKey, TransferState } from '@angular/core';
import { Observable } from 'rxjs';
import * as fs from 'fs';
import { join } from 'path';

export class TranslateServerLoader implements TranslateLoader {
  constructor(private transferState: TransferState) {}

  getTranslation(lang: string): Observable<any> {
    return new Observable((observer) => {
      const path = join(process.cwd(), 'dist/steph/browser/i18n', `${lang}.json`);
      const jsonData = JSON.parse(fs.readFileSync(path, 'utf8'));
      const key: StateKey<any> = makeStateKey('transfer-translate-' + lang);
      this.transferState.set(key, jsonData);
      observer.next(jsonData);
      observer.complete();
    });
  }
}

export function translateServerLoaderFactory(transferState: TransferState) {
  return new TranslateServerLoader(transferState);
}
