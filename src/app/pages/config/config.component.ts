import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ConfigItemCardComponent } from '@components/config-item-card/config-item-card.component';
import { FormSignInputComponent } from '@components/form/form-sign-input/form-sign-input.component';
import { DashboardLayoutComponent } from '@layouts/dashboard-layout/dashboard-layout.component';
import { ionLockClosedOutline, ionMailOutline, ionPersonOutline } from "@ng-icons/ionicons";
import { validatorNameSign, validatorPasswordSign } from 'app/utils/ValidatorsForms';

@Component({
  selector: 'app-config',
  standalone: true,
  imports: [DashboardLayoutComponent, ConfigItemCardComponent, FormSignInputComponent, ReactiveFormsModule],
  templateUrl: './config.component.html',
  styleUrl: './config.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfigComponent {
  public lockIcon: string = ionLockClosedOutline;
  public mailIcon: string = ionMailOutline;
  public userIcon: string = ionPersonOutline;

  constructor(private _fb: FormBuilder) {};

  public changePassForm = this._fb.group({
    oldPassword: ["", validatorPasswordSign()],
    newPassword: ["", validatorPasswordSign()]
  });

  public changeEmailForm = this._fb.group({
    oldEmail: ["", [Validators.required, Validators.email]],
    newEmail: ["", [Validators.required, Validators.email]]
  });

  public changeNameForm = this._fb.group({
    name: ["", validatorNameSign()]
  });

  get oldPassword() {
    return this.changePassForm.get("oldPassword");
  };

  get newPassword() {
    return this.changePassForm.get("newPassword");
  };

  get oldEmail() {
    return this.changeEmailForm.get("oldEmail");
  };

  get newEmail() {
    return this.changeEmailForm.get("newEmail");
  };

  get name() {
    return this.changeNameForm.get("name");
  };

  public checkHaveValue(value: string | undefined | null) {
    if (typeof value != "string")
      return false;
    else if (value.length > 0) 
      return true;
    else return false;
  }
};