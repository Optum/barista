import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavItem } from '@app/shared/nav/nav-item';
import { NavService } from '@app/shared/nav/nav.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
  animations: [
    trigger('indicatorRotate', [
      state('collapsed', style({ transform: 'rotate(0deg)' })),
      state('expanded', style({ transform: 'rotate(180deg)' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4,0.0,0.2,1)')),
    ]),
  ],
})
export class SideNavComponent implements OnInit {
  constructor(public navService: NavService, public router: Router, public route: ActivatedRoute) {
    if (this.depth === undefined) {
      this.depth = 0;
    }
  }

  // tslint:disable:member-ordering
  expanded: boolean;
  @HostBinding('attr.aria-expanded') ariaExpanded = this.expanded;
  @Input() depth: number;
  // tslint:enable:member-ordering
  @Input() item: NavItem;

  isActive(): boolean {
    return this.router.isActive(
      this.router.createUrlTree([this.item.route], { relativeTo: this.route }).toString(),
      true,
    );
  }

  ngOnInit() {
    // subscribing to the url, if the item has a route and url, then it doesn't have children and expanded is set to 0.
    this.navService.currentUrl.subscribe((url: string) => {
      if (this.item.route && url) {
        this.expanded = url.indexOf(`/${this.item.route}`) === 0;
        this.ariaExpanded = this.expanded;
      }
    });
  }

  onItemSelected(item: NavItem) {
    if (!item.children || !item.children.length) {
      this.router.navigate([item.route], {
        relativeTo: this.route,
        state: {
          item,
        },
      });
    }
    if (item.children && item.children.length) {
      this.expanded = !this.expanded;
    }
  }
}
