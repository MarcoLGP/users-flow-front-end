import { DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
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
import { UserService } from '@services/user.service';

@Component({
  selector: 'app-user-notes',
  standalone: true,
  imports: [
    DashboardLayoutComponent,
    NoteItemListComponent,
    DatePipe,
    FabButtonComponent,
    CreateEditNoteModalComponent,
    SpinnerComponent,
  ],
  templateUrl: './user-notes.component.html',
  styleUrl: './user-notes.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserNotesComponent implements OnInit {
  constructor(
    private _noteService: NoteService,
    private _userService: UserService
  ) { }

  public userNotes: WritableSignal<INote[]> = signal([]);
  public indexSelectedNote: WritableSignal<number | null> = signal(null);

  public isEditNote: WritableSignal<boolean> = signal(false);
  public addEditNoteModalOpen: WritableSignal<boolean> = signal(false);

  public loadingNotes: WritableSignal<boolean> = signal(false);
  public loadingMoreNotes: WritableSignal<boolean> = signal(false);
  public hasMoreNotes: WritableSignal<boolean> = signal(true);

  public userName: WritableSignal<string> = signal('');

  private actualSkip: number = 10;
  private readonly takeUserNotes: number = 10;

  ngOnInit(): void {
    this.getSetNotesUser();
  }
  public getSetNotesUser() {
    this.loadingNotes.set(true);
    this._noteService.getUserNotes(0, this.takeUserNotes).subscribe({
      next: (notes) => {
        if (notes?.length > 0) {
          this.userNotes.set(
            notes.sort(
              (a, b) =>
                new Date(b.created!).getTime() - new Date(a.created!).getTime()
            )
          );
        }
      },
      error: () => {
        this.loadingNotes.set(false);
      },
      complete: () => {
        this.loadingNotes.set(false);
      },
    });

    this._userService.userName.subscribe({
      next: (next) => {
        this.userName.set(next);
      },
    });
  }

  public deleteSelectedNote(event: boolean) {
    if (event) {
      this._noteService.deleteNote(this.userNotes()[this.indexSelectedNote()!].noteId!)
        .subscribe({
          complete: () => {
            this.indexSelectedNote.set(null);
            this.actualSkip = 10;
            this.getSetNotesUser();
          }
        })
    }
  }

  public loadMoreNotes() {
    if (!this.hasMoreNotes() || this.loadingMoreNotes()) return;
    this.loadingMoreNotes.set(true);
    this._noteService
      .getUserNotes(this.actualSkip, this.takeUserNotes)
      .subscribe({
        next: (notes) => {
          if (notes?.length > 0) {
            this.userNotes.set(
              this.userNotes()
                .concat(notes)
                .sort(
                  (a, b) =>
                    new Date(b.created!).getTime() -
                    new Date(a.created!).getTime()
                )
            );
            this.actualSkip += this.takeUserNotes;
            this.loadingMoreNotes.set(false);
            if (notes.length == this.takeUserNotes) this.hasMoreNotes.set(true);
            else this.hasMoreNotes.set(false);
          }
        },
      });
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(): void {
    const pos =
      (document.documentElement.scrollTop || document.body.scrollTop) +
      window.innerHeight;
    const max = document.documentElement.scrollHeight;

    if (pos >= max - 100 && !this.loadingNotes()) {
      this.loadMoreNotes();
    }
  }

  updateNotesUser(formResult: any) {
    if (formResult?.success == true) {
      this.actualSkip = 10;
      this.getSetNotesUser();
    }
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
