import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BoxReturnFormComponent } from '@components/box-return-form/box-return-form.component';
import { FormSignInputComponent } from '@components/form-sign-input/form-sign-input.component';

@Component({
  selector: 'app-config-box-form',
  standalone: true,
  imports: [FormSignInputComponent, ReactiveFormsModule, BoxReturnFormComponent],
  templateUrl: './config-box-form.component.html',
  styleUrl: './config-box-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfigBoxFormComponent {
  @Input({ required: true }) formGroup!: FormGroup;
  @Input({ required: true }) errorsMessage!: string[];
  @Input({ required: true }) submitForm!: () => void;
  @Input({ required: true }) formValuesError: boolean = false;

  public isSubmitted: boolean = false;
}
