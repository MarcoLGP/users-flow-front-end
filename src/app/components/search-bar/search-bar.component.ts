import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgIconComponent } from '@ng-icons/core';
import { ionSearch } from "@ng-icons/ionicons";

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [NgIconComponent],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchBarComponent {
  @Input() inputWidth?: number;
  @Input() placeholder: string = 'Pesquisar';
  public searchIcon: string = ionSearch;
}
