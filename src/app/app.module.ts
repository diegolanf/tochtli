import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NavigationComponent } from '@app/navigation/navigation.component';
import { ROUTES } from '@app/routes';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { metaReducers, reducers } from './store';
import { TranslocoRootModule } from './transloco-root.module';

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
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
