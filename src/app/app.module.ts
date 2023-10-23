import {
  DEFAULT_CURRENCY_CODE,
  isDevMode,
  LOCALE_ID,
  NgModule,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '../modules/shared/shared.module';

import deLocale from '@angular/common/locales/de';
import { registerLocaleData } from '@angular/common';
import { ServiceWorkerModule } from '@angular/service-worker';

registerLocaleData(deLocale);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    SharedModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      //enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
  providers: [
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'CHF' },
    { provide: LOCALE_ID, useValue: 'de-CH' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
