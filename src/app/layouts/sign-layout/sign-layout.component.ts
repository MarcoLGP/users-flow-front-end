import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { Router } from '@angular/router';
import { LocalStorageService } from '@services/local.storage.service';

@Component({
  selector: 'app-sign-layout',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './sign-layout.component.html',
  styleUrl: './sign-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignLayoutComponent implements OnInit {
  constructor(private _router: Router, private _localStorageService: LocalStorageService) { };

  @Input() redirectUser: boolean = true;

  ngOnInit(): void {
    if (typeof localStorage == "undefined" || !this.redirectUser) return;
    if (this._localStorageService.getDecrypted('token')) {
      this._router.navigateByUrl('/notes');
    }
  }
}
