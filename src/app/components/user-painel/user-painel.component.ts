import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { ionPeople } from '@ng-icons/ionicons';
import { UserService } from 'app/services/user.service';

@Component({
  selector: 'app-user-painel',
  standalone: true,
  imports: [NgOptimizedImage, NgIcon],
  templateUrl: './user-painel.component.html',
  styleUrl: './user-painel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserPainelComponent implements OnInit {
  constructor (private _userService: UserService) {}
  
  public peopleIcon: string = ionPeople;
  public userName = signal("");

  ngOnInit(): void {
    this._userService.userName.subscribe({
      next: (next) => {
        this.userName.set(next);
      }
    });
  }
}
