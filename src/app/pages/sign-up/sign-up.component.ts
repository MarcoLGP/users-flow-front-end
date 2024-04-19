import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DividerOrComponent } from '@components/divider-or/divider-or.component';
import { FormSignInputComponent } from '@components/form/form-sign-input/form-sign-input.component';
import { SignLayoutComponent } from '@layouts/sign-layout/sign-layout.component';
import { ionPersonOutline, ionMailOutline, ionLockClosedOutline } from '@ng-icons/ionicons';
import { AuthService } from 'app/services/auth.service';
import { LocalStorageService } from 'app/services/local.storage.service';
import { UserService } from 'app/services/user.service';
import { validatorNameSign, validatorPasswordSign } from 'app/utils/ValidatorsForms';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [SignLayoutComponent, FormSignInputComponent, ReactiveFormsModule, DividerOrComponent],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignUpComponent {
  constructor (
    private _fb: FormBuilder, 
    private _router: Router,
    private _localStorageService: LocalStorageService,
    private _authService: AuthService,
    private _userService: UserService
  ){}

  public userIcon: string = ionPersonOutline; 
  public mailIcon: string = ionMailOutline;
  public lockIcon: string = ionLockClosedOutline;

  public isFormSubmitted: boolean = false;

  public signUpForm = this._fb.group({
    name: ["", validatorNameSign()],
    email: ["", [Validators.required, Validators.email]],
    password: ["", validatorPasswordSign()]
  });

  get name() {
    return this.signUpForm.get("name");
  }

  get email() {
    return this.signUpForm.get("email");
  }

  get password() {
    return this.signUpForm.get("password");
  }

  public navigateToSignIn() {
    this._router.navigateByUrl("/");
  }

  public submitFormSignUp() {
    this.isFormSubmitted = true;
    this._authService.register$(this.name!.value!, this.email!.value!, this.password!.value!).subscribe({
      next: (next) => {
        this._localStorageService.set("token", next.token);
        this._localStorageService.set("refreshToken", next.refreshToken);
        this._userService.setUserName(this.name!.value!);
      },
      error: (error) => {
        console.log("Deu erro: ");
      },
      complete: () => {
        this._router.navigateByUrl("/notes");
      }
    })
  }
}
