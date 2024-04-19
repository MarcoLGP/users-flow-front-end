import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardAsideNavOptionItemComponent } from '@components/dashboard-aside-nav-option-item/dashboard-aside-nav-option-item.component';
import { UserPainelComponent } from '@components/user-painel/user-painel.component';
import { NgIcon } from '@ng-icons/core';
import { ionDocumentTextSharp, ionGlobeOutline, ionLogOut, ionMenu, ionSettings } from '@ng-icons/ionicons';
import { AuthService } from 'app/services/auth.service';
import { LocalStorageService } from 'app/services/local.storage.service';
import { UserService } from 'app/services/user.service';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [NgIcon, NgOptimizedImage, UserPainelComponent, DashboardAsideNavOptionItemComponent],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardLayoutComponent implements OnInit {
  constructor (
    private _router: Router, 
    private _userService: UserService, 
    private _localStorageService: LocalStorageService,
    private _authService: AuthService
  ){};

  @Input({ required: true }) public titleRoute!: string;
  @Input({ required: true }) public descriptionRoute!: string;
  
  public menuIcon: string = ionMenu;
  public globeIcon: string = ionGlobeOutline;
  public noteIcon: string = ionDocumentTextSharp;
  public settingsIcon: string = ionSettings;
  public logoutIcon: string = ionLogOut;

  public userName = signal("");

  ngOnInit(): void {
    this._userService.userName.subscribe({
      next: (next) => {
        this.userName.set(next);
      }
    });
  };

  public navigateToHome() {
    this._router.navigateByUrl("/home");
  };

  public navigateToConfiguration() {
    this._router.navigateByUrl("/configuration");
  };

  public logout() {
    this._authService.logout$(this._localStorageService.get("token"), this._localStorageService.get("refreshToken")).subscribe({
      next: () => {
        this._localStorageService.remove("token");
        this._localStorageService.remove("refreshToken");
      },
      error: (error) => {
        
      },
      complete: () => {
        this._userService.setUserName("");
        this._router.navigateByUrl("");
      }
    });
  };
}
