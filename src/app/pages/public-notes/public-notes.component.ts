import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DashboardLayoutComponent } from '@layouts/dashboard-layout/dashboard-layout.component';

@Component({
  selector: 'app-public-notes',
  standalone: true,
  imports: [DashboardLayoutComponent],
  templateUrl: './public-notes.component.html',
  styleUrl: './public-notes.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PublicNotesComponent {

}
