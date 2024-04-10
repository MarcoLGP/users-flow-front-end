import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormSignInputComponent } from '@components/form/form-sign-input/form-sign-input.component';
import { SignLayoutComponent } from '@layouts/sign-layout/sign-layout.component';
import { heroUser, heroLockClosed } from '@ng-icons/heroicons/outline';
import { validatorNameSign, validatorPasswordSign } from 'app/utils/ValidatorsForms';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [SignLayoutComponent, FormSignInputComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignInComponent {
  public userIcon = heroUser;
  public lockIcon = heroLockClosed;
  public signInForm: FormGroup;
  public isSubmitted: boolean = false;

  constructor(private _fb: FormBuilder) {
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
}
