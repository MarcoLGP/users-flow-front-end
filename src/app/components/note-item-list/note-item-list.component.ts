import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-note-item-list',
  standalone: true,
  imports: [],
  templateUrl: './note-item-list.component.html',
  styleUrl: './note-item-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoteItemListComponent {
  @Input({ required: true }) title!: string;
  @Input({ required: true }) content!: string;
  @Input({ required: true }) date!: string;
}
