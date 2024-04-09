import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SignInComponent } from './components/sign-in/sign-in.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SignInComponent],
  template: `<app-sign-in />`,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  
}
