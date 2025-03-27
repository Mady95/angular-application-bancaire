import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { routes } from './app/app.routes'; // Importer les routes

bootstrapApplication(AppComponent, appConfig).catch(err => console.error(err));
bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(routes), // Passer les routes définies dans app.routes.ts
    importProvidersFrom(CommonModule, FormsModule) // Fournir les modules nécessaires pour le formulaire
  ]
}).catch(err => console.error(err));
