import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  WritableSignal,
  signal,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BoxReturnFormComponent } from '@components/box-return-form/box-return-form.component';
import { FormSignInputComponent } from '@components/form-sign-input/form-sign-input.component';
import { SpinnerComponent } from '@components/spinner/spinner.component';
import { SignLayoutComponent } from '@layouts/sign-layout/sign-layout.component';
import { NgIcon } from '@ng-icons/core';
import { ionCheckmarkCircle, ionLockClosedOutline } from '@ng-icons/ionicons';
import { AuthService } from '@services/auth.service';
import { UserService } from '@services/user.service';
import { validatorPasswordSign } from '@utils/ValidatorsForms';

@Component({
  selector: 'app-recovery-pass',
  standalone: true,
  imports: [
    SignLayoutComponent,
    FormSignInputComponent,
    ReactiveFormsModule,
    CommonModule,
    BoxReturnFormComponent,
    NgIcon,
    SpinnerComponent
  ],
  templateUrl: './recovery-pass.component.html',
  styleUrl: './recovery-pass.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecoveryPassComponent implements OnInit {
  constructor(
    private _route: ActivatedRoute,
    private _fb: FormBuilder,
    private _userService: UserService,
    private _authService: AuthService,
    private _router: Router
  ) { }

  public errorsMessages: WritableSignal<string[]> = signal([]);
  public lockIcon: string = ionLockClosedOutline;
  public successIcon: string = ionCheckmarkCircle;
  public isFormSubmitted: boolean = false;

  public isValidToken: WritableSignal<boolean> = signal<boolean>(false);
  public invalidTokenErrorMessage: WritableSignal<string> = signal<string>('');

  public successChangePass: WritableSignal<boolean> = signal<boolean>(false);

  public loadingRequest: WritableSignal<boolean> = signal<boolean>(false);
  public checkingToken: WritableSignal<boolean> = signal<boolean>(true);

  public recoveryPassForm = this._fb.group({
    newPassword: ['', [validatorPasswordSign()]],
    confirmNewPassword: ['', [validatorPasswordSign()]],
  });

  private token = this._route.snapshot.params['token'];

  ngOnInit(): void {
    this._authService.checkToken$(this.token).subscribe({
      next: () => {
        this.isValidToken.set(true);
        this.checkingToken.set(false);
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.invalidTokenErrorMessage.set(
            'Infelizmente não foi possível recuperar a senha, tente resgatar novamente'
          );
        } else {
          this.invalidTokenErrorMessage.set(
            'Infelizmente não foi possível recuperar a senha, por favor tente novamente mais tarde'
          );
        }
        this.checkingToken.set(false);
      },
    });
  }

  public navigateToRecoveryPass() {
    this._router.navigateByUrl('/recovery-pass-email');
  }

  public navigateToSignIn() {
    this._router.navigateByUrl('/');
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
      this.errorsMessages.set(['As senhas precisam ser iguais']);
    }

    if (this.confirmNewPassword?.errors) {
      this.errorsMessages.update((errors) =>
        errors.concat(this.confirmNewPassword?.errors?.['errorMessage'])
      );
    }

    if (this.newPassword?.errors) {
      this.errorsMessages.update((errors) =>
        errors.concat(this.newPassword?.errors?.['errorMessage'])
      );
    }

    if (this.errorsMessages().length > 0) return;

    this.loadingRequest.set(true);

    this._userService
      .updatePasswordRecoveryUser(this.newPassword!.value!, this.token)
      .subscribe({
        next: () => {
          this.successChangePass.set(true);
        },
        error: () => {
          this.loadingRequest.set(false);
        },
      });
  }
}
