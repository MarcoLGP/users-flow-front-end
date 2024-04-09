import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SignInputComponent } from '@components/sign-input/sign-input.component';
import { SignLayoutComponent } from '@layouts/sign-layout/sign-layout.component';
import { heroUser, heroLockClosed } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [SignLayoutComponent, SignInputComponent],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignInComponent {
  public userIcon = heroUser;
  public lockIcon = heroLockClosed;
}
