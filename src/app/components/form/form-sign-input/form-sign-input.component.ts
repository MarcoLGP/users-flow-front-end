import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgIconComponent } from '@ng-icons/core';

@Component({
  selector: 'app-form-sign-input',
  standalone: true,
  imports: [NgIconComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './form-sign-input.component.html',
  styleUrl: './form-sign-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormSignInputComponent {
  @Input({ required: true }) inputLabel!: string;
  @Input({ required: true }) icon!: string;
  @Input({ required: true }) placeholder!: string;
  @Input() typeInput: string = 'text';
  @Input({required: true}) inputControlName!: string;
  @Input({ required: true }) inputFormGroup!: FormGroup;
}
