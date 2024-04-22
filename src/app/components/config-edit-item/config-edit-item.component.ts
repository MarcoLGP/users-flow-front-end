import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { ionChevronForward } from '@ng-icons/ionicons';

@Component({
  selector: 'app-config-edit-item',
  standalone: true,
  imports: [NgIcon],
  templateUrl: './config-edit-item.component.html',
  styleUrl: './config-edit-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfigEditItemComponent {
  @Input({ required: true }) icon!: string;
  @Input({ required: true }) label!: string;
  @Input() firstItem: boolean = false;

  public rightChevronIcon: string = ionChevronForward;
  public openEditItem: boolean = false;

  public handleClick() {
    this.openEditItem = !this.openEditItem;
  };
}
