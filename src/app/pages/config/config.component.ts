import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfigItemCardComponent } from '@components/config-item-card/config-item-card.component';
import { DashboardLayoutComponent } from '@layouts/dashboard-layout/dashboard-layout.component';

@Component({
  selector: 'app-config',
  standalone: true,
  imports: [DashboardLayoutComponent, ConfigItemCardComponent],
  templateUrl: './config.component.html',
  styleUrl: './config.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfigComponent {

}
