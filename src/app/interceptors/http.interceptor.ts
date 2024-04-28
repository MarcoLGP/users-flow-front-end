import {
  HttpClient,
  HttpErrorResponse,
  HttpInterceptorFn,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '@services/local.storage.service';
import { environment } from 'environments/environment';
import { throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

const routesNoTokenAuth = [
  'Auth/sign-in',
  'Auth/sign-up',
  'User/password-recovery',
  'Auth/check-token',
];

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  if (!routesNoTokenAuth.some((r) => req.url.includes(r))) {
    const localStorageService = inject(LocalStorageService);
    const http = inject(HttpClient);
    const router = inject(Router);

    const reqAuth = req.clone({
      setHeaders: {
        Authorization: `Bearer ${localStorageService.getDecrypted('token')}`,
      },
    });

    return next(reqAuth).pipe(
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse && err.status === 401) {
          return http
            .post<{ token: string; refreshToken: string }>(
              `${environment.apiUrl}/Auth/refresh-token`,
              { refreshToken: localStorageService.getDecrypted('refreshToken') }
            )
            .pipe(
              switchMap((refreshResponse) => {
                localStorageService.setEncrypted(
                  'token',
                  refreshResponse.token
                );
                localStorageService.setEncrypted(
                  'refreshToken',
                  refreshResponse.refreshToken
                );

                const newReq = req.clone({
                  setHeaders: {
                    Authorization: `Bearer ${refreshResponse.token}`,
                  },
                });

                return next(newReq);
              }),
              catchError((refreshError) => {
                if (
                  refreshError instanceof HttpErrorResponse &&
                  refreshError.status === 401
                ) {
                  localStorageService.remove('token');
                  localStorageService.remove('refreshToken');
                  router.navigateByUrl('/');
                }
                return throwError(refreshError);
              })
            );
        }

        return throwError(err);
      })
    );
  }

  return next(req);
};
