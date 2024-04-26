import { Routes } from '@angular/router';
import { ConfigComponent } from '@pages/config/config.component';
import { PublicNotesComponent } from '@pages/public-notes/public-notes.component';
import { RecoveryPassEmailComponent } from '@pages/recovery-pass-email/recovery-pass-email.component';
import { RecoveryPassComponent } from '@pages/recovery-pass/recovery-pass.component';
import { SignInComponent } from '@pages/sign-in/sign-in.component';
import { SignUpComponent } from '@pages/sign-up/sign-up.component';
import { UserNotesComponent } from '@pages/user-notes/user-notes.component';

export const routes: Routes = [
    {
        path: '',
        component: SignInComponent
    },
    {
        path: 'register',
        component: SignUpComponent
    },
    {
        path: 'recovery-pass/:token',
        component: RecoveryPassComponent
    },
    {
        path: 'recovery-pass-email',
        component: RecoveryPassEmailComponent
    },
    {
        path: 'notes',
        component: UserNotesComponent
    },
    {
        path: 'configuration',
        component: ConfigComponent
    },
    {
        path: 'public-notes',
        component: PublicNotesComponent
    },
    {
        path: '**',
        redirectTo: ''
    }
];
