import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { LocalStorageService } from './local.storage.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private _httpClient: HttpClient, 
    private _localStorageService: LocalStorageService
  ) {};

  public userName = new BehaviorSubject("");

  public setUserName(name: string) {
    this.userName.next(name);
  };

  public deleteUser(): Observable<any> {
    const token = this._localStorageService.get("token");
    return this._httpClient.delete(`${environment.apiUrl}/User`, { headers: { Authorization: `Bearer ${token}` } });
  };

  public updatePasswordUser(oldPassword: string, newPassword: string): Observable<any> {
    const token = this._localStorageService.get("token");
    return this._httpClient.put(`${environment.apiUrl}/User/password`, { oldPassword, newPassword }, { headers: { Authorization: `Bearer ${token}` } });
  };

  public updateNameUser(name: string): Observable<any> {
    const token = this._localStorageService.get("token");
    return this._httpClient.put(`${environment.apiUrl}/User/name`, { name }, { headers: { Authorization: `Bearer ${token}` } });
  };

  public updateEmailUser(email: string): Observable<any> {
    const token = this._localStorageService.get("token");
    return this._httpClient.put(`${environment.apiUrl}/User/email`, { email }, { headers: { Authorization: `Bearer ${token}` } });
  };
}
