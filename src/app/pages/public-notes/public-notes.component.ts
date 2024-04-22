import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NoteItemListComponent } from '@components/note-item-list/note-item-list.component';
import { SearchBarComponent } from '@components/search-bar/search-bar.component';
import { DashboardLayoutComponent } from '@layouts/dashboard-layout/dashboard-layout.component';
import { INote } from '@models/Note';

@Component({
  selector: 'app-public-notes',
  standalone: true,
  imports: [DashboardLayoutComponent, SearchBarComponent, NoteItemListComponent, DatePipe],
  templateUrl: './public-notes.component.html',
  styleUrl: './public-notes.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PublicNotesComponent {
  public publicNotes: INote[] = [
    { noteId: 1, content: "Conteúdo bacana de uma note", created: "2022-01-01", title: "Note bacana", locked: false, public: false },
  ];
}
