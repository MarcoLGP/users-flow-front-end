import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, WritableSignal } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from '@services/global.service';

@Component({
  selector: 'app-aside-drawer',
  standalone: true,
  imports: [NgClass],
  templateUrl: './aside-drawer.component.html',
  styleUrl: './aside-drawer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AsideDrawerComponent {
  constructor(private _router: Router, private _globalService: GlobalService) { };

  @Input({ required: true }) isDrawerOpen!: boolean;
  @Input({ required: true }) setDrawerOpen!: WritableSignal<boolean>;
  public navigateTo(route: string) {
    this.setDrawerOpen.set(false);
    this._globalService.setShowDrawNav(false);
    this._router.navigateByUrl(route);
  };

  public closeDrawer() {
    this.setDrawerOpen.set(false);
    this._globalService.setShowDrawNav(false);
  }
}
