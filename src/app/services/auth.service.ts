import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ISignInResponse, ISignOutResponse } from 'app/models/Auth';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private _httpCliente: HttpClient) {};

  public login$(email: string, password: string): Observable<ISignInResponse> {
    return this._httpCliente.post<ISignInResponse>(`${environment.apiUrl}/Auth/sign-in`, { email, password });
  };

  public register$(name: string, email: string, password: string): Observable<ISignOutResponse> {
    return this._httpCliente.post<ISignOutResponse>(`${environment.apiUrl}/Auth/sign-up`, { name, email, password });
  };

  public logout$(token: string, refreshToken: string): Observable<void> {
    return this._httpCliente.post<void>(`${environment.apiUrl}/Auth/sign-out`, { refreshToken }, { headers: { Authorization: `Bearer ${token}` } });
  };
}
