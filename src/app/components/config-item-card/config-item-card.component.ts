import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-config-item-card',
  standalone: true,
  imports: [],
  templateUrl: './config-item-card.component.html',
  styleUrl: './config-item-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfigItemCardComponent {
  @Input({ required: true }) Title!: string;
  @Input({ required: true }) Description!: string;
  @Input() customIsExpanded: boolean = false;

  public isExpanded: boolean = false;
}
