import { Routes } from '@angular/router';
import { ConfigComponent } from '@pages/config/config.component';
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
        path: 'notes',
        component: UserNotesComponent
    },
    {
        path: 'configuration',
        component: ConfigComponent
    },
    {
        path: '**',
        redirectTo: ''
    }
];
