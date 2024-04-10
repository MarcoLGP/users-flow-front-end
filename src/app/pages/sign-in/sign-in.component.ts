import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DividerOrComponent } from '@components/divider-or/divider-or.component';
import { FormSignInputComponent } from '@components/form/form-sign-input/form-sign-input.component';
import { SignLayoutComponent } from '@layouts/sign-layout/sign-layout.component';
import { ionPersonOutline, ionLockClosedOutline } from '@ng-icons/ionicons';
import { validatorNameSign, validatorPasswordSign } from 'app/utils/ValidatorsForms';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [SignLayoutComponent, FormSignInputComponent, ReactiveFormsModule, CommonModule, DividerOrComponent],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignInComponent {
  public userIcon = ionPersonOutline;
  public lockIcon = ionLockClosedOutline;
  public signInForm: FormGroup;
  public isSubmitted: boolean = false;

  constructor(private _fb: FormBuilder, private _router: Router) {
    this.signInForm = this._fb.group({
      name: ["", validatorNameSign()],
      password: ["", validatorPasswordSign()]
    });
  };

  public get name() {
    return this.signInForm.get("name");
  };

  public get password() {
    return this.signInForm.get("password");
  };

  public submitForm() {
    this.isSubmitted = true;
  };

  public navigateToSignUp() {
   this._router.navigateByUrl("/register");
  }
}
