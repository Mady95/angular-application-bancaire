import {ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import {provideRouter, Routes} from '@angular/router';
import {HttpClientModule, provideHttpClient} from '@angular/common/http';
import {CreateAccountComponent} from './create-account/create-account.component';
import {ProfileComponent} from './profile/profile.component';

const routes: Routes = [
  { path: 'create-account', component: CreateAccountComponent },
  { path: 'profile', component: ProfileComponent }
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom(HttpClientModule)
  ]
};
