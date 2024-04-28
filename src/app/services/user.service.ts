import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { IUserInfo } from '@models/User';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private _httpClient: HttpClient) {}

  public userName = new BehaviorSubject('');
  public userEmail = signal('');

  public setUserName(name: string) {
    this.userName.next(name);
  }

  public setUserEmail(email: string) {
    this.userEmail.set(email);
  }

  public deleteUser(): Observable<void> {
    return this._httpClient.delete<void>(`${environment.apiUrl}/User`);
  }

  public updatePasswordUser(
    oldPassword: string,
    newPassword: string
  ): Observable<void> {
    return this._httpClient.put<void>(`${environment.apiUrl}/User/password`, {
      oldPassword,
      newPassword,
    });
  }

  public updatePasswordRecoveryUser(
    password: string,
    token: string
  ): Observable<void> {
    return this._httpClient.put<void>(
      `${environment.apiUrl}/User/password-recovery`,
      {
        password,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  }

  public updateNameUser(name: string): Observable<void> {
    return this._httpClient.put<void>(`${environment.apiUrl}/User/name`, {
      name,
    });
  }

  public updateEmailUser(email: string): Observable<void> {
    return this._httpClient.put<void>(`${environment.apiUrl}/User/email`, {
      email,
    });
  }

  public getUserInfo(): Observable<IUserInfo> {
    return this._httpClient.get<IUserInfo>(`${environment.apiUrl}/User`);
  }
}
