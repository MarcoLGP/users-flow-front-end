import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  WritableSignal,
  signal,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { BoxReturnFormComponent } from '@components/box-return-form/box-return-form.component';
import { DividerOrComponent } from '@components/divider-or/divider-or.component';
import { FormSignInputComponent } from '@components/form-sign-input/form-sign-input.component';
import { SpinnerComponent } from '@components/spinner/spinner.component';
import { SignLayoutComponent } from '@layouts/sign-layout/sign-layout.component';
import { ionLockClosedOutline, ionMailOutline } from '@ng-icons/ionicons';
import { AuthService } from '@services/auth.service';
import { LocalStorageService } from '@services/local.storage.service';
import { UserService } from '@services/user.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    SignLayoutComponent,
    FormSignInputComponent,
    ReactiveFormsModule,
    CommonModule,
    DividerOrComponent,
    BoxReturnFormComponent,
    RouterLink,
    SpinnerComponent,
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInComponent {
  public mailIcon = ionMailOutline;
  public lockIcon = ionLockClosedOutline;
  public isFormSubmitted: boolean = false;

  private _token: string | null = null;
  private _refreshToken: string | null = null;

  public loadingRequest: WritableSignal<boolean> = signal(false);

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _authService: AuthService,
    private _localStorageService: LocalStorageService,
    private _userService: UserService
  ) {}

  public errorsMessages: WritableSignal<string[]> = signal([]);

  public signInForm = this._fb.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', Validators.required],
  });

  public get email() {
    return this.signInForm.get('email');
  }

  public get password() {
    return this.signInForm.get('password');
  }

  public handleInputError(inputControl: AbstractControl | null) {
    return this.isFormSubmitted && inputControl?.errors ? true : false;
  }

  public submitForm() {
    this.isFormSubmitted = true;
    this.errorsMessages.set([]);

    if (this.email?.errors) {
      this.errorsMessages.update((errors) => errors.concat('E-mail inválido'));
    }

    if (this.password?.errors) {
      this.errorsMessages.update((errors) => errors.concat('Senha inválida'));
    }

    if (this.errorsMessages().length > 0) return;

    this.loadingRequest.set(true);

    this._authService
      .login$(this.email!.value!, this.password!.value!)
      .subscribe({
        next: (next) => {
          this._token = next.token;
          this._refreshToken = next.refreshToken;
          this._userService.setUserName(next.name);
          this._userService.setUserEmail(next.email);
        },
        error: (error_response: HttpErrorResponse) => {
          switch (error_response.status) {
            case 401:
              this.errorsMessages.update((errors) =>
                errors.concat('E-mail ou senha inválidos')
              );
              break;
            case 400:
              this.errorsMessages.update((errors) =>
                errors.concat(
                  'Não foi possível processar a operação. Tente novamente mais tarde'
                )
              );
              break;
            default:
              this.errorsMessages.update((errors) =>
                errors.concat('Erro inesperado. Tente novamente mais tarde')
              );
              break;
          }
          this.loadingRequest.set(false);
        },
        complete: () => {
          this._localStorageService.setEncrypted('token', this._token!);
          this._localStorageService.setEncrypted(
            'refreshToken',
            this._refreshToken!
          );
          this._router.navigateByUrl('/notes');
        },
      });
  }

  public navigateToSignUp() {
    this._router.navigateByUrl('/register');
  }
}
