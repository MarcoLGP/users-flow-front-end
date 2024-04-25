import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
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

  public deleteUser(): Observable<any> {
    return this._httpClient.delete(`${environment.apiUrl}/User`);
  }

  public updatePasswordUser(
    oldPassword: string,
    newPassword: string
  ): Observable<any> {
    return this._httpClient.put(`${environment.apiUrl}/User/password`, {
      oldPassword,
      newPassword,
    });
  }

  public updateNameUser(name: string): Observable<any> {
    return this._httpClient.put(`${environment.apiUrl}/User/name`, { name });
  }

  public updateEmailUser(email: string): Observable<any> {
    return this._httpClient.put(`${environment.apiUrl}/User/email`, { email });
  }
}
