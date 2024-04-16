import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfigItemCardComponent } from '@components/config-item-card/config-item-card.component';
import { FormSignInputComponent } from '@components/form/form-sign-input/form-sign-input.component';
import { DashboardLayoutComponent } from '@layouts/dashboard-layout/dashboard-layout.component';
import { ionLockClosedOutline, ionMailOutline, ionPersonOutline } from "@ng-icons/ionicons";
import { LocalStorageService } from 'app/services/local.storage.service';
import { UserService } from 'app/services/user.service';
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

  constructor(
    private _fb: FormBuilder, 
    private _userService: UserService,
    private _router: Router,
    private _localStorageService: LocalStorageService
  ) {};

  public changePassForm = this._fb.group({
    oldPassword: ["", validatorPasswordSign()],
    newPassword: ["", validatorPasswordSign()]
  });

  public changeEmailForm = this._fb.group({
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
  };

  public changeEmailUserFormSubmit() {
    this._userService.updateEmailUser(this.newEmail!.value!).subscribe({
      next: (next) => {
        console.log(next);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        this.changeEmailForm.reset({
          newEmail: ""
        });
      }
    });
  };

  public changePasswordUserFormSubmit() {
    this._userService.updatePasswordUser(this.oldPassword!.value!, this.newPassword!.value!).subscribe({
      next: (next) => {
        console.log(next);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        this.changePassForm.reset({
          newPassword: "",
          oldPassword: ""
        });
      }
    });
  };

  public changeNameUserFormSubmit() {
    this._userService.updateNameUser(this.name!.value!).subscribe({
      next: (next) => {
        console.log(next);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        this._userService.setUserName(this.name!.value!);
        this.changeNameForm.reset({
          name: ""
        });
      }
    });
  };

  public deleteUser() {
    this._userService.deleteUser().subscribe({
      next: (next) => {
        console.log(next);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        this._localStorageService.remove("token");
        this._localStorageService.remove("refreshToken");
        this._router.navigateByUrl("/");
      }
    });
  };
};