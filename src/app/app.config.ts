import { ApplicationConfig, LOCALE_ID } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';

import locale_pt_BR from "@angular/common/locales/pt";
import { registerLocaleData } from '@angular/common';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

registerLocaleData(locale_pt_BR);

export const appConfig: ApplicationConfig = {
  providers: [ 
    provideRouter(routes), 
    provideClientHydration(), 
    { provide: LOCALE_ID, useValue: 'pt-BR' }, 
    provideHttpClient(withFetch()), provideAnimationsAsync()],
};
