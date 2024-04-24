import { NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  WritableSignal,
  signal,
  PLATFORM_ID,
  Inject,
} from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AsideDrawerComponent } from '@components/aside-drawer/aside-drawer.component';
import { NgIcon } from '@ng-icons/core';
import {
  ionMenu
} from '@ng-icons/ionicons';
import { AuthService } from '@services/auth.service';
import { LocalStorageService } from '@services/local.storage.service';
import { UserService } from '@services/user.service';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [
    NgIcon,
    NgOptimizedImage,
    RouterLinkActive,
    RouterLink,
    AsideDrawerComponent
  ],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardLayoutComponent implements OnInit {
  constructor(
    private _router: Router,
    private _userService: UserService,
    private _localStorageService: LocalStorageService,
    private _authService: AuthService
  ) { }

  @Input({ required: true }) public titleRoute!: string;
  @Input({ required: true }) public descriptionRoute!: string;

  public menuIcon: string = ionMenu;

  public openUserOptions: boolean = false;

  public userName: WritableSignal<string> = signal('');
  public userEmail: WritableSignal<string> = signal('');

  public showDrawNav: WritableSignal<boolean> = signal(false);

  ngOnInit(): void {
    this._userService.userName.subscribe({
      next: (next) => {
        this.userName.set(next);
      },
    });
  }

  public handleDrawer() {
    this.showDrawNav.set(!this.showDrawNav());
  }

  public logout() {
    this._authService
      .logout$(
        this._localStorageService.get('token'),
        this._localStorageService.get('refreshToken')
      )
      .subscribe({
        error: () => {
          this._authService.logoutOperation();
        },
        complete: () => {
          this._authService.logoutOperation();
        },
      });
  }
}
