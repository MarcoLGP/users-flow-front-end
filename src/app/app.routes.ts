import { Routes } from '@angular/router';
import { ConfigComponent } from '@pages/config/config.component';
import { PublicNotesComponent } from '@pages/public-notes/public-notes.component';
import { RecoveryPassEmailComponent } from '@pages/recovery-pass-email/recovery-pass-email.component';
import { RecoveryPassComponent } from '@pages/recovery-pass/recovery-pass.component';
import { SignInComponent } from '@pages/sign-in/sign-in.component';
import { SignUpComponent } from '@pages/sign-up/sign-up.component';
import { UserNotesComponent } from '@pages/user-notes/user-notes.component';
import { authGuard } from './guards/auth.guard';
import { isUserLoggedGuard } from './guards/is-user-logged.guard';

export const routes: Routes = [
  {
    path: '',
    component: SignInComponent,
    canActivate: [isUserLoggedGuard]
  },
  {
    path: 'register',
    component: SignUpComponent,
    canActivate: [isUserLoggedGuard]
  },
  {
    path: 'recovery-pass/:token',
    component: RecoveryPassComponent,
  },
  {
    path: 'recovery-pass-email',
    component: RecoveryPassEmailComponent,
    canActivate: [isUserLoggedGuard]
  },
  {
    path: 'notes',
    component: UserNotesComponent,
    canActivate: [authGuard],
  },
  {
    path: 'configuration',
    component: ConfigComponent,
    canActivate: [authGuard],
  },
  {
    path: 'public-notes',
    component: PublicNotesComponent,
    canActivate: [authGuard],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
