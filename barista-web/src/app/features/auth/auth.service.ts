import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Project, UserApiService, UserInfo } from '@app/shared/api';
import * as _ from 'lodash';
import { BehaviorSubject } from 'rxjs';

export class AuthServiceStatus {
  isLoggedIn?: boolean;
  isLoggingIn?: boolean;
  statusMessage?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  constructor(private userApiService: UserApiService, private router: Router) {}

  static get isLoggedIn(): boolean {
    return !!AuthService.accessToken();
  }

  get userInfo(): UserInfo {
    try {
      const info = JSON.parse(localStorage.getItem('userInfo'));
      if (!info) {
        this.router.navigate(['/signin']);
      }
      return info;
    } catch (e) {
      this.router.navigate(['/signin']);
    }
  }

  get canOverrideLicenses(): boolean {
    const { role } = this.userInfo;
    return role === UserInfo.RoleEnum.Admin || role === UserInfo.RoleEnum.LicenseAdmin;
  }

  get canOverrideVulnerabilities(): boolean {
    const { role } = this.userInfo;
    return role === UserInfo.RoleEnum.Admin || role === UserInfo.RoleEnum.SecurityAdmin;
  }

  get canAddProjectNotes(): boolean {
    return this.userInfo.role === UserInfo.RoleEnum.Admin;
  }

  get isAdmin(): boolean {
    const { role } = this.userInfo;
    return (
      role === UserInfo.RoleEnum.Admin ||
      role === UserInfo.RoleEnum.LicenseAdmin ||
      role === UserInfo.RoleEnum.SecurityAdmin
    );
  }

  redirectUrl: string;
  statusChange = new BehaviorSubject<AuthServiceStatus>({});

  static accessToken(): string {
    return localStorage.getItem('accessToken');
  }

  private static setAccessToken(accessToken: string): void {
    localStorage.setItem('accessToken', accessToken);
  }

  isProjectOwner(project: Project): boolean {
    return (
      !project.userId ||
      project.userId === this.userInfo.id ||
      this.isAdmin ||
      _.findIndex(this.userInfo.groups, group => group.toLowerCase() === project.userId.toLowerCase()) !== -1
    );
  }

  async login(username: string, password: string) {
    let status: AuthServiceStatus = {
      isLoggingIn: true,
      isLoggedIn: false,
      statusMessage: 'Authenticating...',
    };
    this.statusChange.next(status);
    try {
      const res = await this.userApiService.userLoginPost({ username, password }).toPromise();
      AuthService.setAccessToken(res.accessToken);
      this.statusChange.next((status = { ...status, statusMessage: 'Getting user details...' }));
      const userInfo = await this.userApiService.userMeGet().toPromise();
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
      this.statusChange.next((status = { ...status, isLoggedIn: true, statusMessage: '' }));
      await this.router.navigate([this.redirectUrl || '/dashboard']);
    } catch (e) {
      this.statusChange.next(
        (status = {
          ...status,
          statusMessage: e.statusText || 'An unknown error occurred.',
        }),
      );
    } finally {
      this.statusChange.next({ ...status, isLoggingIn: false });
    }
  }

  async logout() {
    localStorage.removeItem('accessToken');
    await this.router.navigate(['/signin']);
  }

  ngOnDestroy(): void {}
}
