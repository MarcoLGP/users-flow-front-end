import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgIconComponent } from "@ng-icons/core";

@Component({
  selector: 'app-sign-input',
  standalone: true,
  imports: [NgIconComponent],
  templateUrl: './sign-input.component.html',
  styleUrl: './sign-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignInputComponent {
  @Input({ required: true }) inputLabel!: string;
  @Input({ required: true }) icon!: string;
  @Input({ required: true }) placeholder!: string;
  @Input() typeInput: 'text' | 'password' = 'text';
}
