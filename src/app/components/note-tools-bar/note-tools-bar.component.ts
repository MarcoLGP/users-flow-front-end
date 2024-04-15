import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { ionTrashOutline, ionPencilOutline, ionLockClosedOutline, ionAddOutline } from '@ng-icons/ionicons';

@Component({
  selector: 'app-note-tools-bar',
  standalone: true,
  imports: [NgIcon],
  templateUrl: './note-tools-bar.component.html',
  styleUrl: './note-tools-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoteToolsBarComponent {
  public trashIcon: string = ionTrashOutline;
  public pencilIcon: string = ionPencilOutline;
  public lockIcon: string = ionLockClosedOutline;
  public addIcon: string = ionAddOutline;
}
