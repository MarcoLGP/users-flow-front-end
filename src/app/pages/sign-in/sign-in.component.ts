import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DividerOrComponent } from '@components/divider-or/divider-or.component';
import { FormSignInputComponent } from '@components/form/form-sign-input/form-sign-input.component';
import { SignLayoutComponent } from '@layouts/sign-layout/sign-layout.component';
import { ionLockClosedOutline, ionMailOutline } from '@ng-icons/ionicons';
import { AuthService } from 'app/services/auth.service';
import { LocalStorageService } from 'app/services/local.storage.service';
import { UserService } from 'app/services/user.service';
import { validatorPasswordSign } from 'app/utils/ValidatorsForms';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [SignLayoutComponent, FormSignInputComponent, ReactiveFormsModule, CommonModule, DividerOrComponent],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignInComponent {
  public mailIcon = ionMailOutline;
  public lockIcon = ionLockClosedOutline;
  public signInForm: FormGroup;
  public isSubmitted: boolean = false;

  private _token: string | null = null;
  private _refreshToken: string | null = null;

  constructor(
    private _fb: FormBuilder, 
    private _router: Router,
    private _authService: AuthService,
    private _localStorageService: LocalStorageService,
    private _userService: UserService
  ) {
    this.signInForm = this._fb.group({
      email: ["", Validators.email],
      password: ["", validatorPasswordSign()]
    });
  };

  public get email() {
    return this.signInForm.get("email");
  };

  public get password() {
    return this.signInForm.get("password");
  };

  public submitForm() {
    this.isSubmitted = true;
    this._authService.login$(this.email?.value, this.password?.value).subscribe({
      next: (next) => {
        this._token = next.token;
        this._refreshToken = next.refreshToken;
        this._userService.setUserName(next.name);
      },
      error: (error) => {
        console.log("Erro: " + error.code);
      },
      complete: () => {
        this._localStorageService.set("token", this._token!);
        this._localStorageService.set("refreshToken", this._refreshToken!);
        this._router.navigateByUrl("/home");
      }
    });
  };

  public navigateToSignUp() {
   this._router.navigateByUrl("/register");
  }
}
