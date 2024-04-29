import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  OnInit,
  WritableSignal,
  signal,
} from '@angular/core';
import { NoteItemListComponent } from '@components/note-item-list/note-item-list.component';
import { SpinnerComponent } from '@components/spinner/spinner.component';
import { DashboardLayoutComponent } from '@layouts/dashboard-layout/dashboard-layout.component';
import { INote } from '@models/Note';
import { NoteService } from '@services/note.service';

@Component({
  selector: 'app-public-notes',
  standalone: true,
  imports: [DashboardLayoutComponent, NoteItemListComponent, SpinnerComponent],
  templateUrl: './public-notes.component.html',
  styleUrl: './public-notes.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PublicNotesComponent implements OnInit {
  constructor(private _noteService: NoteService) {}

  public publicNotes: WritableSignal<INote[]> = signal([]);

  public loadingNotes: WritableSignal<boolean> = signal(false);
  public loadingMoreNotes: WritableSignal<boolean> = signal(false);
  public hasMoreNotes: WritableSignal<boolean> = signal(true);

  private readonly takePublicNotes: number = 10;
  private actualSkip: number = 10;

  ngOnInit(): void {
    this.loadingNotes.set(true);
    this._noteService.getPublicNotes(0, this.takePublicNotes).subscribe({
      next: (notes) => {
        if (notes?.length > 0) {
          this.publicNotes.set(
            notes.sort(
              (a, b) =>
                new Date(b.created).getTime() - new Date(a.created).getTime()
            )
          );
          if (notes.length == this.takePublicNotes) this.hasMoreNotes.set(true);
          else this.hasMoreNotes.set(false);
        }
      },
      error: () => {
        this.loadingNotes.set(false);
      },
      complete: () => {
        this.loadingNotes.set(false);
      },
    });
  }

  public loadMoreNotes() {
    if (!this.hasMoreNotes() || this.loadingMoreNotes()) return;
    this.loadingMoreNotes.set(true);
    this._noteService
      .getPublicNotes(this.actualSkip, this.takePublicNotes)
      .subscribe({
        next: (notes) => {
          if (notes?.length > 0) {
            this.publicNotes.set(
              this.publicNotes()
                .concat(notes)
                .sort(
                  (a, b) =>
                    new Date(b.created).getTime() -
                    new Date(a.created).getTime()
                )
            );
            this.loadingMoreNotes.set(false);
            if (notes.length == this.takePublicNotes)
              this.hasMoreNotes.set(true);
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
}
