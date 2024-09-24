import {Injectable} from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  mainKey:string = "STOCK_APP_";
  cryptoKey = "test";
  constructor() {
  }

  public setItem(key: string, value: string) {
    localStorage.setItem(this.mainKey + key.toUpperCase(), value);
  }

  public getItem(key: string) {
    const data = localStorage.getItem(this.mainKey + key.toUpperCase()) || '';
    return data;
  }

  public setItemEcrypted(key: string, value: string) {
    localStorage.setItem(this.mainKey + key.toUpperCase(), this.encrypt(value));
  }

  public getItemDecrypted(key: string) {
    const data = localStorage.getItem(this.mainKey + key.toUpperCase()) || '';
    return this.decrypt(data);
  }

  public removeData(key: string) {
    localStorage.removeItem(this.mainKey +  key.toUpperCase());
  }

  public clearData() {
    localStorage.clear();
  }

  private encrypt(txt: string): string {
    return CryptoJS.AES.encrypt(txt, this.cryptoKey).toString();
  }

  private decrypt(txtToDecrypt: string) {
    return CryptoJS.AES.decrypt(txtToDecrypt,this.cryptoKey).toString(
      CryptoJS.enc.Utf8
    );
  }
}
