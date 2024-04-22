import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { ionClose } from '@ng-icons/ionicons';

@Component({
  selector: 'app-box-return-form',
  standalone: true,
  imports: [NgIcon],
  templateUrl: './box-return-form.component.html',
  styleUrl: './box-return-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoxReturnFormComponent {
  @Input({ required: true }) errorsMessage: string[] = [];

  public errorIcon: string = ionClose;
}
