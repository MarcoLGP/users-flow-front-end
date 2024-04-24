import { NgOptimizedImage, isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
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
  ionDocumentTextSharp,
  ionGlobeOutline,
  ionLogOut,
  ionMenu,
  ionSettings,
} from '@ng-icons/ionicons';
import { AuthService } from '@services/auth.service';
import { GlobalService } from '@services/global.service';
import { LocalStorageService } from '@services/local.storage.service';
import { UserService } from '@services/user.service';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [
    NgIcon,
    NgOptimizedImage,
    AsideDrawerComponent,
    RouterLinkActive,
    RouterLink,
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
    private _authService: AuthService,
    private _globalService: GlobalService,
    @Inject(PLATFORM_ID) private _platformId: Object
  ) {}

  @Input({ required: true }) public titleRoute!: string;
  @Input({ required: true }) public descriptionRoute!: string;

  public menuIcon: string = ionMenu;
  public globeIcon: string = ionGlobeOutline;
  public noteIcon: string = ionDocumentTextSharp;
  public settingsIcon: string = ionSettings;
  public logoutIcon: string = ionLogOut;

  public userName: WritableSignal<string> = signal('');
  public userEmail: WritableSignal<string> = signal('');

  public showDrawNav: WritableSignal<boolean> = signal(
    this._globalService.getShowDrawNav()
  );
  public showAside: WritableSignal<boolean> = signal(
    this._globalService.getShowAside()
  );

  ngOnInit(): void {
    if (
      this._globalService.getFirstRender() &&
      isPlatformBrowser(this._platformId)
    ) {
      if (window.innerWidth > 768) {
        this._globalService.setShowAside(true);
        this.showAside.set(true);
      }
      this._globalService.setFirstRender(false);
    }
    this._userService.userName.subscribe({
      next: (next) => {
        this.userName.set(next);
      },
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    if (window.innerWidth < 768 && this.showAside()) {
      this._globalService.setShowAside(false);
      this.showAside.set(false);
      this._globalService.setShowDrawNav(true);
      this.showDrawNav.set(true);
    } else if (window.innerWidth > 768 && this.showDrawNav()) {
      this._globalService.setShowDrawNav(false);
      this.showDrawNav.set(false);
      this._globalService.setShowAside(true);
      this.showAside.set(true);
    }
  }

  public toggleAside() {
    const width: number = window.innerWidth;

    if (width < 768) {
      const actual_value = this._globalService.getShowDrawNav();
      this._globalService.setShowDrawNav(!actual_value);
      this.showDrawNav.set(!actual_value);
    } else {
      const actual_value = this._globalService.getShowAside();
      this._globalService.setShowAside(!actual_value);
      this.showAside.set(!actual_value);
    }
  }

  public navigateToHome() {
    this._router.navigateByUrl('/home');
  }

  public navigateToConfiguration() {
    this._router.navigateByUrl('/configuration');
  }

  public logout() {
    this._authService
      .logout$(
        this._localStorageService.get('token'),
        this._localStorageService.get('refreshToken')
      )
      .subscribe({
        next: () => {
          this._localStorageService.remove('token');
          this._localStorageService.remove('refreshToken');
        },
        error: (error) => {},
        complete: () => {
          this._userService.setUserName('');
          this._router.navigateByUrl('');
        },
      });
  }
}
