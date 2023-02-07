import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, importProvidersFrom, isDevMode } from '@angular/core';
import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AppComponent } from '@app/app.component';
import { NavigationService } from '@app/core/services/navigation.service';
import { TranslocoHttpLoader } from '@app/core/translation/transloco-http-loader';
import { ROUTES } from '@app/routes';
import { effects, metaReducers, reducers } from '@app/store';
import {
  TRANSLOCO_CONFIG,
  TRANSLOCO_LOADER,
  translocoConfig,
  TranslocoModule,
} from '@ngneat/transloco';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { forkJoin, Observable } from 'rxjs';

// Services initialised during application bootstrap
const serviceInitializer =
  (navigationService: NavigationService): (() => Observable<[void]>) =>
  () =>
    forkJoin([navigationService.init()]);

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      BrowserAnimationsModule,
      BrowserModule,
      EffectsModule.forRoot(effects),
      HttpClientModule,
      RouterModule.forRoot(ROUTES),
      StoreModule.forRoot(reducers, {
        metaReducers,
      }),
      TranslocoModule
    ),
    {
      provide: APP_INITIALIZER,
      deps: [NavigationService],
      useFactory: serviceInitializer,
      multi: true,
    },
    {
      provide: TRANSLOCO_CONFIG,
      useValue: translocoConfig({
        availableLangs: ['en', 'es'],
        defaultLang: 'en',
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
      }),
    },
    { provide: TRANSLOCO_LOADER, useClass: TranslocoHttpLoader },
  ],
}).catch((err: unknown) => console.error(err));
