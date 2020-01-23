import { Injectable } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class NavService {
  constructor(private router: Router) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl.next(event.urlAfterRedirects);
      }
    });
  }
  public appDrawer: any;
  public currentUrl = new BehaviorSubject<string>(undefined);
  public navBarStatus: boolean;

  public changeState() {
    this.navBarStatus = !this.navBarStatus;
    if (this.navBarStatus) {
      this.closeNav();
    } else {
      this.openNav();
    }
  }

  public closeNav() {
    this.appDrawer.close();
  }

  public openNav() {
    this.appDrawer.open();
  }

  untilDestroyed(this) {
    this.unsubscribe();
  }
}
