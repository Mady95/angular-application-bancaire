import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

export interface CustomApplicationConfig extends ApplicationConfig {
  useMockRepository: boolean;
}

export const appConfig: CustomApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }  ),
    provideRouter(routes),
    provideHttpClient(),
  ],
  useMockRepository: false,  
};
