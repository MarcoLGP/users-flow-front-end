import { Injectable, WritableSignal, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  private _showAside: WritableSignal<boolean> = signal(false);
  private _showDrawNav: WritableSignal<boolean> = signal(false);

  private firstRender: boolean = true;

  getShowAside() {
    return this._showAside();
  };

  getShowDrawNav() {
    return this._showDrawNav();
  };

  getFirstRender() {
    return this.firstRender;
  };

  setFirstRender(value: boolean) {
    this.firstRender = value;
  };

  setShowAside(value: boolean) {
    this._showAside.set(value);
  };

  setShowDrawNav(value: boolean) {
    this._showDrawNav.set(value);
  };
}
