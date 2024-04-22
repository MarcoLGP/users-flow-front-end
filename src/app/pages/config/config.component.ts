import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BoxReturnFormComponent } from '@components/box-return-form/box-return-form.component';
import { ConfigBoxFormComponent } from '@components/config-box-form/config-box-form.component';
import { ConfigEditItemComponent } from '@components/config-edit-item/config-edit-item.component';
import { FormSignInputComponent } from '@components/form-sign-input/form-sign-input.component';
import { UserAvatarComponent } from '@components/user-avatar/user-avatar.component';
import { DashboardLayoutComponent } from '@layouts/dashboard-layout/dashboard-layout.component';
import { NgIcon } from '@ng-icons/core';
import { ionCalendarOutline, ionGlobeOutline, ionLockClosedOutline, ionMailOutline, ionPersonOutline, ionReaderOutline, ionTrashOutline } from "@ng-icons/ionicons";
import { LocalStorageService } from '@services/local.storage.service';
import { UserService } from '@services/user.service';
import { validatorNameSign, validatorPasswordSign } from '@utils/ValidatorsForms';

@Component({
  selector: 'app-config',
  standalone: true,
  imports: [DashboardLayoutComponent, FormSignInputComponent, ReactiveFormsModule, UserAvatarComponent, NgIcon, ConfigEditItemComponent, ConfigBoxFormComponent, BoxReturnFormComponent],
  templateUrl: './config.component.html',
  styleUrl: './config.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfigComponent {
  constructor(
    private _fb: FormBuilder, 
    private _userService: UserService,
    private _router: Router,
    private _localStorageService: LocalStorageService
  ) {};

  public lockIcon: string = ionLockClosedOutline;
  public mailIcon: string = ionMailOutline;
  public userIcon: string = ionPersonOutline;
  public noteIcon: string = ionReaderOutline;
  public globeIcon: string = ionGlobeOutline;
  public calendarIcon: string = ionCalendarOutline;
  public trashIcon: string = ionTrashOutline;

  public selectedIndexMenu: number = 0;

  public isNameFormSubmit: boolean = false;
  public isEmailFormSubmit: boolean = false;
  public isPasswordFormSubmit: boolean = false;

  public changePasswordForm = this._fb.group({
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
    return this.changePasswordForm.get("oldPassword");
  };

  get newPassword() {
    return this.changePasswordForm.get("newPassword");
  };

  get newEmail() {
    return this.changeEmailForm.get("newEmail");
  };

  get name() {
    return this.changeNameForm.get("name");
  };

  public handleClickMenu(index: number) {
    this.selectedIndexMenu = index;
  }

  public checkHaveValue(value: string | undefined | null) {
    if (typeof value != "string")
      return false;
    else if (value.length > 0) 
      return true;
    else return false;
  };

  public changeEmailUserFormSubmit() {
    this.isEmailFormSubmit = true;
    
    if (!this.changeEmailForm?.valid)
      return;

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
    this.isPasswordFormSubmit = true;

    if (!this.changePasswordForm?.valid)
      return;

    this._userService.updatePasswordUser(this.oldPassword!.value!, this.newPassword!.value!).subscribe({
      next: (next) => {
        console.log(next);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        this.changePasswordForm.reset({
          newPassword: "",
          oldPassword: ""
        });
      }
    });
  };

  public changeNameUserFormSubmit() {
    this.isNameFormSubmit = true;

    if (!this.changeNameForm?.valid)
      return;

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