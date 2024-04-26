import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, WritableSignal, signal } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BoxReturnFormComponent } from '@components/box-return-form/box-return-form.component';
import { FormSignInputComponent } from '@components/form-sign-input/form-sign-input.component';
import { SignLayoutComponent } from '@layouts/sign-layout/sign-layout.component';
import { ionLockClosedOutline } from '@ng-icons/ionicons';
import { validatorPasswordSign } from '@utils/ValidatorsForms';

@Component({
  selector: 'app-recovery-pass',
  standalone: true,
  imports: [SignLayoutComponent, FormSignInputComponent, ReactiveFormsModule, CommonModule, BoxReturnFormComponent],
  templateUrl: './recovery-pass.component.html',
  styleUrl: './recovery-pass.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecoveryPassComponent implements OnInit {
  constructor(private _route: ActivatedRoute, private _fb: FormBuilder) { };

  public errorsMessages: WritableSignal<string[]> = signal([]);
  public lockIcon: string = ionLockClosedOutline;
  public isFormSubmitted: boolean = false;

  public recoveryPassForm = this._fb.group({
    newPassword: ['', [validatorPasswordSign()]],
    confirmNewPassword: ['', [validatorPasswordSign()]]
  });

  ngOnInit(): void {
    const token = this._route.snapshot.params['token'];
    console.log(token);
  }

  public handleInputError(inputControl: AbstractControl | null) {
    return this.isFormSubmitted && inputControl?.errors ? true : false;
  }

  get newPassword() {
    return this.recoveryPassForm.get('newPassword');
  }

  get confirmNewPassword() {
    return this.recoveryPassForm.get('confirmNewPassword');
  }

  public submitForm() {
    this.errorsMessages.set([]);
    this.isFormSubmitted = true;

    if (this.newPassword?.value !== this.confirmNewPassword?.value) {
      this.errorsMessages.set(["As senhas precisam ser iguais"]);
    }

    if (this.confirmNewPassword?.errors) {
      this.errorsMessages.update((errors) => errors.concat(this.confirmNewPassword?.errors?.['errorMessage']));
    }

    if (this.newPassword?.errors) {
      this.errorsMessages.update((errors) => errors.concat(this.newPassword?.errors?.['errorMessage']));
    }

    if (this.errorsMessages().length === 0) return;
  }
}
