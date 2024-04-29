import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LocalStorageService } from '@services/local.storage.service';

export const isUserLoggedGuard: CanActivateFn = () => {
  const platformId = inject(PLATFORM_ID);

  if (!isPlatformBrowser(platformId)) {
    return false;
  }

  const localStorageService = inject(LocalStorageService);

  if (localStorageService.getDecrypted('token') && localStorageService.getDecrypted('refreshToken')) {
    const router = inject(Router);
    router.navigateByUrl('/notes');

    return false;
  }

  return true;
};
