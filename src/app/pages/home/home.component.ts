import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NoteItemListComponent } from '@components/note-item-list/note-item-list.component';
import { NoteToolsBarComponent } from '@components/note-tools-bar/note-tools-bar.component';
import { SearchBarComponent } from '@components/search-bar/search-bar.component';
import { DashboardLayoutComponent } from '@layouts/dashboard-layout/dashboard-layout.component';
import { NgIcon } from '@ng-icons/core';
import { ionChevronDown } from '@ng-icons/ionicons';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgOptimizedImage, SearchBarComponent, NoteToolsBarComponent, NoteItemListComponent, NgIcon, DashboardLayoutComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  public arrowDownIcon: string = ionChevronDown;
}
