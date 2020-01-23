import { Component, OnDestroy, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService, AuthServiceStatus } from '@app/features/auth/auth.service';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit, OnDestroy {
  constructor(private router: Router, private authService: AuthService) {
    authService.statusChange.pipe(untilDestroyed(this)).subscribe((value: AuthServiceStatus) => {
      this.message = value.statusMessage;
    });
  }
  message = '';
  password = '';
  username = '';

  ngOnDestroy(): void {}

  ngOnInit() {}

  async signin() {
    await this.authService.login(this.username, this.password);
  }
}
