import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { NgIcon } from '@ng-icons/core';
import { ionExit, ionHome, ionSettings } from '@ng-icons/ionicons';
import { AuthService } from 'app/services/auth.service';
import { LocalStorageService } from 'app/services/local.storage.service';
import { UserService } from 'app/services/user.service';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [NgIcon, NgOptimizedImage],
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
  
  public homeIcon: string = ionHome;
  public settingsIcon: string = ionSettings;
  public exitIcon: string = ionExit;

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
