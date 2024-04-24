import {
  ChangeDetectionStrategy,
  Component,
  Input,
  WritableSignal,
  signal,
} from '@angular/core';
import { CreateEditNoteModalComponent } from '@components/modals/create-edit-note-modal/create-edit-note-modal.component';
import { NgIcon } from '@ng-icons/core';
import {
  ionTrashOutline,
  ionPencilOutline,
  ionLockClosedOutline,
  ionAddOutline,
} from '@ng-icons/ionicons';
import { INoteSelected } from '@models/Note';
import { NoteService } from '@services/note.service';

@Component({
  selector: 'app-note-tools-bar',
  standalone: true,
  imports: [NgIcon, CreateEditNoteModalComponent],
  templateUrl: './note-tools-bar.component.html',
  styleUrl: './note-tools-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteToolsBarComponent {
  constructor(private _noteService: NoteService) {}

  @Input({ required: false }) public noteSelected!: INoteSelected;

  public isEdit: WritableSignal<boolean> = signal(false);

  public trashIcon: string = ionTrashOutline;
  public pencilIcon: string = ionPencilOutline;
  public lockIcon: string = ionLockClosedOutline;
  public addIcon: string = ionAddOutline;

  public openCreateEditNoteModal: WritableSignal<boolean> = signal(false);

  public setOpenCreateNoteModal() {
    this.isEdit.set(false);
    this.openCreateEditNoteModal.set(true);
  }

  public setOpenEditNoteModal() {
    this.isEdit.set(true);
    this.openCreateEditNoteModal.set(true);
  }

  public deleteNoteSelected() {
    console.log(this.noteSelected);
    this._noteService.deleteNote(this.noteSelected.noteId).subscribe({
      next: () => {
        console.log('Next');
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        console.log('Complete');
      },
    });
  }
}
