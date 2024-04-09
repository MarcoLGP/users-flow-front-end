import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-sign-layout',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './sign-layout.component.html',
  styleUrl: './sign-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignLayoutComponent {

}
