import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/features/auth/auth.service';
import { UserInfo } from '@app/shared/api/model/user-info';
import { NavService } from '@app/shared/nav/nav.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router, public navService: NavService, private authService: AuthService) {}

  isLoggedIn: boolean;
  role: string;
  @Output() public sidenavToggle = new EventEmitter();
  userName: string;

  async logout() {
    await this.authService.logout();
  }

  ngOnInit() {
    this.isLoggedIn = AuthService.isLoggedIn;
    const { displayName, role } = this.authService.userInfo;
    this.userName = displayName;
    this.role = UserInfo.RoleEnum[role];
  }
}
