import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgIcon } from '@ng-icons/core';
import { ionExit, ionHome, ionSettings } from '@ng-icons/ionicons';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [NgIcon, NgOptimizedImage],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardLayoutComponent {
  public homeIcon: string = ionHome;
  public settingsIcon: string = ionSettings;
  public exitIcon: string = ionExit;

  constructor (private _router: Router){};

  public navigateToHome() {
    this._router.navigateByUrl("/home");
  }

  public navigateToConfiguration() {
    this._router.navigateByUrl("/configuration");
  }
}
