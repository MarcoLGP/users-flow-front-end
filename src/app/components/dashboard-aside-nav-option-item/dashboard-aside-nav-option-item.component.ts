import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgIcon } from '@ng-icons/core';
import { ionChevronForward } from '@ng-icons/ionicons';

@Component({
  selector: 'app-dashboard-aside-nav-option-item',
  standalone: true,
  imports: [NgIcon],
  templateUrl: './dashboard-aside-nav-option-item.component.html',
  styleUrl: './dashboard-aside-nav-option-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardAsideNavOptionItemComponent {
  constructor(private _router: Router) {}

  @Input({required: true}) icon!: string;
  @Input({required: true}) text!: string;
  @Input({required: true}) routeToNavigate!: string;

  public navIcon: string = ionChevronForward;

  public navigateTo() {
    this._router.navigateByUrl(this.routeToNavigate);
  };
}
