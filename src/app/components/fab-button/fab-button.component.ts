import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-fab-button',
  standalone: true,
  imports: [NgIcon],
  templateUrl: './fab-button.component.html',
  styleUrl: './fab-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FabButtonComponent {
  public addNoteIcon: string = '';
}
