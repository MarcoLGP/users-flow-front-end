import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { UserAvatarComponent } from '@components/user-avatar/user-avatar.component';
import { NgIcon } from '@ng-icons/core';
import { ionLockClosed, ionPerson } from '@ng-icons/ionicons';

@Component({
  selector: 'app-note-item-list',
  standalone: true,
  imports: [UserAvatarComponent, NgIcon, NgClass],
  templateUrl: './note-item-list.component.html',
  styleUrl: './note-item-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteItemListComponent {
  @Input({ required: true }) title!: string;
  @Input({ required: true }) content!: string;
  @Input({ required: true }) date!: string;
  @Input({ required: true }) author!: string;

  public userIcon: string = ionPerson;
  public lockedIcon: string = ionLockClosed;
}
