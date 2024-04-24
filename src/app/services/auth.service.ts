import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  IRefreshTokenResponse,
  ISignInResponse,
  ISignOutResponse,
} from '@models/Auth';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { LocalStorageService } from './local.storage.service';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private _httpCliente: HttpClient,
    private _localStorageService: LocalStorageService,
    private _userService: UserService,
    private _router: Router) { };

  public login$(email: string, password: string): Observable<ISignInResponse> {
    return this._httpCliente.post<ISignInResponse>(
      `${environment.apiUrl}/Auth/sign-in`,
      { email, password }
    );
  }

  public register$(
    name: string,
    email: string,
    password: string
  ): Observable<ISignOutResponse> {
    return this._httpCliente.post<ISignOutResponse>(
      `${environment.apiUrl}/Auth/sign-up`,
      { name, email, password }
    );
  }

  public logout$(token: string, refreshToken: string): Observable<void> {
    return this._httpCliente.post<void>(
      `${environment.apiUrl}/Auth/sign-out`,
      { refreshToken },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  }

  public refreshToken$(
    refreshToken: string
  ): Observable<IRefreshTokenResponse> {
    return this._httpCliente.post<ISignInResponse>(
      `${environment.apiUrl}/Auth/refresh-token`,
      { refreshToken }
    );
  }

  public logoutOperation() {
    try {
      this._localStorageService.remove('token');
      this._localStorageService.remove('refreshToken');
    } catch (error) { };
    this._userService.setUserName('');
    this._router.navigateByUrl('/');
  }
}
