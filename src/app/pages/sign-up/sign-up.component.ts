import { HttpErrorResponse } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  WritableSignal,
  signal,
} from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BoxReturnFormComponent } from '@components/box-return-form/box-return-form.component';
import { DividerOrComponent } from '@components/divider-or/divider-or.component';
import { FormSignInputComponent } from '@components/form-sign-input/form-sign-input.component';
import { SpinnerComponent } from '@components/spinner/spinner.component';
import { SignLayoutComponent } from '@layouts/sign-layout/sign-layout.component';
import {
  ionPersonOutline,
  ionMailOutline,
  ionLockClosedOutline,
} from '@ng-icons/ionicons';
import { AuthService } from '@services/auth.service';
import { LocalStorageService } from '@services/local.storage.service';
import { UserService } from '@services/user.service';
import {
  validatorNameSign,
  validatorPasswordSign,
} from '@utils/ValidatorsForms';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    SignLayoutComponent,
    FormSignInputComponent,
    ReactiveFormsModule,
    DividerOrComponent,
    BoxReturnFormComponent,
    SpinnerComponent
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpComponent {
  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _localStorageService: LocalStorageService,
    private _authService: AuthService,
    private _userService: UserService
  ) { }

  public isFormSubmitted: boolean = false;
  public userIcon: string = ionPersonOutline;
  public mailIcon: string = ionMailOutline;
  public lockIcon: string = ionLockClosedOutline;

  public errorsMessages: WritableSignal<string[]> = signal([]);
  public loadingRequest: WritableSignal<boolean> = signal(false);

  public signUpForm = this._fb.group({
    name: ['', validatorNameSign()],
    email: ['', [Validators.required, Validators.email]],
    password: ['', validatorPasswordSign()],
  });

  get name() {
    return this.signUpForm.get('name');
  }

  get email() {
    return this.signUpForm.get('email');
  }

  get password() {
    return this.signUpForm.get('password');
  }

  public handleInputError(inputControl: AbstractControl | null) {
    return this.isFormSubmitted && inputControl?.errors ? true : false;
  }
  public navigateToSignIn() {
    this._router.navigateByUrl('/');
  }

  public submitFormSignUp() {
    this.isFormSubmitted = true;
    this.errorsMessages.set([]);

    if (this.name?.errors) {
      this.errorsMessages.update((errors) => errors.concat(this.name?.errors?.['errorMessage']));
    }

    if (this.email?.errors) {
      this.errorsMessages.update((errors) => errors.concat('E-mail inválido'));
    }

    if (this.password?.errors) {
      this.errorsMessages.update((errors) => errors.concat(this.password?.errors?.['errorMessage']));
    }

    if (this.errorsMessages().length > 0) return;

    this.loadingRequest.set(true);

    this._authService
      .register$(this.name!.value!, this.email!.value!, this.password!.value!)
      .subscribe({
        next: (next) => {
          this._localStorageService.setEncrypted('token', next.token);
          this._localStorageService.setEncrypted(
            'refreshToken',
            next.refreshToken
          );
          this._userService.setUserName(this.name!.value!);
        },
        error: (error: HttpErrorResponse) => {
          switch (error.status) {
            case 409:
              this.errorsMessages.update((errors) =>
                errors.concat('E-mail já cadastrado')
              );
              break;
            default:
              this.errorsMessages.update((errors) =>
                errors.concat(
                  'Não foi possível processar a operação. Tente novamente mais tarde'
                )
              );
              break;
          }
          this.loadingRequest.set(false);
        },
        complete: () => {
          this._router.navigateByUrl('/notes');
        },
      });
  }
}
