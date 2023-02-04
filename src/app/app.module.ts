import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NavigationService } from '@app/core/services/navigation.service';
import { NavigationComponent } from '@app/navigation/navigation.component';
import { ROUTES } from '@app/routes';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { forkJoin, Observable } from 'rxjs';

import { AppComponent } from './app.component';
import { effects, metaReducers, reducers } from './store';
import { TranslocoRootModule } from './transloco-root.module';

// Services initialised during application bootstrap
const serviceInitializer =
  (navigationService: NavigationService): (() => Observable<[void]>) =>
  () =>
    forkJoin([navigationService.init()]);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    NavigationComponent,
    RouterModule.forRoot(ROUTES),
    TranslocoRootModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
    }),
    EffectsModule.forRoot(effects),
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      deps: [NavigationService],
      useFactory: serviceInitializer,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
