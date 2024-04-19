import { DatePipe } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit, WritableSignal, signal } from '@angular/core';
import { NoteItemListComponent } from '@components/note-item-list/note-item-list.component';
import { NoteToolsBarComponent } from '@components/note-tools-bar/note-tools-bar.component';
import { SearchBarComponent } from '@components/search-bar/search-bar.component';
import { DashboardLayoutComponent } from '@layouts/dashboard-layout/dashboard-layout.component';
import { INote } from 'app/models/Note';
import { NoteService } from 'app/services/note.service';

@Component({
  selector: 'app-user-notes',
  standalone: true,
  imports: [DashboardLayoutComponent, SearchBarComponent, NoteToolsBarComponent, NoteItemListComponent, DatePipe],
  templateUrl: './user-notes.component.html',
  styleUrl: './user-notes.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserNotesComponent implements AfterViewInit {
  constructor(private _noteService: NoteService) {};

  public userNotes: WritableSignal<INote[]> = signal([]);
  public indexSelected: WritableSignal<number | null> = signal(null);

  public setNoteSelected(index: number) {
    this.indexSelected.set(index);
  };

  ngAfterViewInit(): void {
    if (typeof localStorage != "undefined") this._noteService.getNotes().subscribe({
      next: (next) => {
        this.userNotes.set(next);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        console.log("Completo")
      }
    })
  }
}
