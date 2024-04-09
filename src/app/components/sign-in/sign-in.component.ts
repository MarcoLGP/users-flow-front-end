import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { validatorNameSign, validatorPasswordSign } from '../../utils/ValidatorsForms';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})

export class SignInComponent {
  public formSubmitted: boolean = false;
  private _fb = inject(FormBuilder);

  public signInForm = this._fb.group({
    name: ["", validatorNameSign()],
    password: ["", validatorPasswordSign()]
  });


  public submitSignInForm() {
    this.formSubmitted = true;
    if (this.signInForm.valid) {
      
    };
  };

  get name() {
    return this.signInForm.get("name");
  };

  get password() {
    return this.signInForm.get("password");
  };
};
