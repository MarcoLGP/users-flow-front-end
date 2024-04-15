import { Routes } from '@angular/router';
import { ConfigComponent } from '@pages/config/config.component';
import { HomeComponent } from '@pages/home/home.component';
import { SignInComponent } from '@pages/sign-in/sign-in.component';
import { SignUpComponent } from '@pages/sign-up/sign-up.component';

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
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'configuration',
        component: ConfigComponent
    }
];
