import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

// Extension de la configuration de l'application pour inclure 'useMockRepository'
export interface CustomApplicationConfig extends ApplicationConfig {
  useMockRepository: boolean;
}

// Configuration de l'application
export const appConfig: CustomApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
  ],
  useMockRepository: false,  // Défini par défaut sur 'true' pour utiliser les données en mémoire
};
