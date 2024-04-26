import { DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  WritableSignal,
  signal,
} from '@angular/core';
import { FabButtonComponent } from '@components/fab-button/fab-button.component';
import { CreateEditNoteModalComponent } from '@components/modals/create-edit-note-modal/create-edit-note-modal.component';
import { NoteItemListComponent } from '@components/note-item-list/note-item-list.component';
import { SpinnerComponent } from '@components/spinner/spinner.component';
import { DashboardLayoutComponent } from '@layouts/dashboard-layout/dashboard-layout.component';
import { INote } from '@models/Note';
import { NoteService } from '@services/note.service';

@Component({
  selector: 'app-user-notes',
  standalone: true,
  imports: [
    DashboardLayoutComponent,
    NoteItemListComponent,
    DatePipe,
    FabButtonComponent,
    CreateEditNoteModalComponent,
    SpinnerComponent
  ],
  templateUrl: './user-notes.component.html',
  styleUrl: './user-notes.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserNotesComponent implements OnInit {
  constructor(private _noteService: NoteService) { }

  public userNotes: WritableSignal<INote[]> = signal([]);
  public indexSelectedNote: WritableSignal<number | null> = signal(null);

  public isEditNote: WritableSignal<boolean> = signal(false);
  public addEditNoteModalOpen: WritableSignal<boolean> = signal(false);
  public hideFabButton: WritableSignal<boolean> = signal(false);

  public loadingNotes: WritableSignal<boolean> = signal(false);

  ngOnInit(): void {
    if (typeof localStorage != 'undefined')
      this.getSetNotesUser();
  }
  public getSetNotesUser() {
    this.loadingNotes.set(true);
    this._noteService.getNotes().subscribe({
      next: (next) => {
        this.userNotes.set(next.sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime()));
      },
      error: () => {
        this.loadingNotes.set(false);
      },
      complete: () => {
        this.loadingNotes.set(false);
      },
    });
  }

  updateNotesUser(formResult: any) {
    if (formResult?.success == true) this.getSetNotesUser();
  }

  public handleDrawNavOpen(open: boolean) {
    if (open) this.hideFabButton.set(true);
    else this.hideFabButton.set(false);
  }

  public setNoteSelected(index: number) {
    if (this.indexSelectedNote() === index) this.indexSelectedNote.set(null);
    else this.indexSelectedNote.set(index);
  }

  public getNoteSelected() {
    return this.userNotes()[this.indexSelectedNote()!];
  }

  public handleNoteSelected() {
    if (this.indexSelectedNote() !== null) {
      return this.userNotes()[this.indexSelectedNote()!];
    }
    return null;
  }
}
