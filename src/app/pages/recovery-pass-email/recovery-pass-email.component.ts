import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, WritableSignal, signal } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BoxReturnFormComponent } from '@components/box-return-form/box-return-form.component';
import { FormSignInputComponent } from '@components/form-sign-input/form-sign-input.component';
import { SignLayoutComponent } from '@layouts/sign-layout/sign-layout.component';
import { NgIcon } from '@ng-icons/core';
import { ionCheckmarkCircleSharp, ionMailOutline } from '@ng-icons/ionicons';

@Component({
  selector: 'app-recovery-pass-email',
  standalone: true,
  imports: [SignLayoutComponent, NgIcon, FormSignInputComponent, CommonModule, ReactiveFormsModule, BoxReturnFormComponent],
  templateUrl: './recovery-pass-email.component.html',
  styleUrl: './recovery-pass-email.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecoveryPassEmailComponent {
  constructor(private _fb: FormBuilder, private _router: Router) { };

  public errorsMessages: WritableSignal<string[]> = signal([]);
  public isFormSubmitted: boolean = false;
  public isSuccessEmail: WritableSignal<boolean> = signal<boolean>(false);

  public successIcon: string = ionCheckmarkCircleSharp;

  public recoveryPassEmailForm = this._fb.group({
    email: ['', [Validators.email, Validators.required]]
  });

  public handleInputError(inputControl: AbstractControl | null) {
    return this.isFormSubmitted && inputControl?.errors ? true : false;
  }

  get email() {
    return this.recoveryPassEmailForm.get('email');
  }

  public InputError(inputControl: AbstractControl | null) {
    return this.isFormSubmitted && inputControl?.errors ? true : false;
  }

  public navigateToSignIn() {
    this._router.navigateByUrl('/');
  }

  public emailIcon: string = ionMailOutline;

  public submitForm() {
    this.isFormSubmitted = true;
    this.errorsMessages.set([]);

    if (this.email?.errors) {
      this.errorsMessages.set(["Email inválido"]);
      return;
    }

    this.isSuccessEmail.set(true);
  }
}
