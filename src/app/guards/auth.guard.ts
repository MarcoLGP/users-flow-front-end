import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LocalStorageService } from '@services/local.storage.service';

export const authGuard: CanActivateFn = () => {
  const platformId = inject(PLATFORM_ID);

  if (!isPlatformBrowser(platformId)) {
    return false;
  }

  const localStorageService = inject(LocalStorageService);

  const token = localStorageService.getDecrypted('token');
  const refreshToken = localStorageService.getDecrypted('refreshToken');

  if (!token || !refreshToken) {

    if (token)
      localStorageService.remove('token');

    if (refreshToken)
      localStorageService.remove('refreshToken');

    const router = inject(Router);
    router.navigateByUrl('/');
  }

  return true;
};
