import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class CryptographyService {
  constructor() {}

  public encrypt(text: string): string {
    return CryptoJS.AES.encrypt(text, environment.cryptoKey).toString();
  }

  public decrypt(text: string): string {
    return CryptoJS.AES.decrypt(text, environment.cryptoKey).toString(
      CryptoJS.enc.Utf8
    );
  }
}
