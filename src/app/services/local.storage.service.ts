import { Injectable } from '@angular/core';
import { CryptographyService } from './cryptography.service';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor(private _cryptoService: CryptographyService) { }

  public setEncrypted(key: string, value: string): void {
    const valueStored = localStorage.getItem(key);

    if (valueStored) localStorage.removeItem(key);

    localStorage.setItem(key, this._cryptoService.encrypt(value));
  }

  public getDecrypted(key: string): string {
    const valueStored = localStorage.getItem(key);
    if (!valueStored) return '';
    else return this._cryptoService.decrypt(localStorage.getItem(key)!)!;
  }

  public remove(key: string): void {
    localStorage.removeItem(key);
  }
}
