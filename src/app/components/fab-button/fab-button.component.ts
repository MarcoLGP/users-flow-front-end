import { ChangeDetectionStrategy, Component, Input, Output, WritableSignal, EventEmitter } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { ionPencilOutline, ionTrashOutline } from '@ng-icons/ionicons';

@Component({
  selector: 'app-fab-button',
  standalone: true,
  imports: [NgIcon],
  templateUrl: './fab-button.component.html',
  styleUrl: './fab-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FabButtonComponent {
  @Input({ required: true }) showSubButtons: boolean = false;
  @Input({ required: true }) openCreateEditNoteModal!: WritableSignal<boolean>;
  @Input({ required: true }) isEditNote!: WritableSignal<boolean>;

  @Output() deleteSelectedNote = new EventEmitter<boolean>();

  public pencilIcon: string = ionPencilOutline;
  public trashIcon: string = ionTrashOutline;

  public clickCreateNoteHandler() {
    this.isEditNote.set(false);
    this.openCreateEditNoteModal.set(true);
  }

  public clickEditNoteHandler() {
    this.isEditNote.set(true);
    this.openCreateEditNoteModal.set(true);
  }

  public clickDeleteNoteHandler() {
    this.deleteSelectedNote.emit(true);
  }
}
