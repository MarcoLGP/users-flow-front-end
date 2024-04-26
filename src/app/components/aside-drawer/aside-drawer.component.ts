import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  WritableSignal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { LocalStorageService } from '@services/local.storage.service';

@Component({
  selector: 'app-aside-drawer',
  standalone: true,
  imports: [NgClass, RouterLink],
  templateUrl: './aside-drawer.component.html',
  styleUrl: './aside-drawer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AsideDrawerComponent {
  constructor(
    private _authService: AuthService,
    private _localStorageService: LocalStorageService
  ) { }

  @Input({ required: true }) drawerOpen!: WritableSignal<boolean>;

  public closeDrawer() {
    this.drawerOpen.set(false);
  }

  public logout() {
    this._authService
      .logout$(
        this._localStorageService.getDecrypted('token'),
        this._localStorageService.getDecrypted('refreshToken')
      )
      .subscribe({
        complete: () => {
          this._authService.logoutOperation();
        },
        error: () => {
          this._authService.logoutOperation();
        },
      });
  }
}
