import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-modal-root',
  standalone: true,
  imports: [],
  templateUrl: './modal-root.component.html',
  styleUrl: './modal-root.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalRootComponent {

}
