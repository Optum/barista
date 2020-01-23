import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AuthService } from '@app/features/auth/auth.service';
import { NavItem } from '@app/shared/nav/nav-item';
import { NavService } from '@app/shared/nav/nav.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements AfterViewInit, OnInit {
  constructor(
    public navService: NavService,
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
  ) {}

  private adminNavItems: NavItem[] = [
    {
      displayName: 'Admin',
      iconName: 'how_to_reg',
      children: [
        {
          displayName: 'Licenses',
          iconName: 'copyright',
          route: '/licenses',
        },
        {
          displayName: 'Obligations',
          iconName: 'receipt',
          route: '/obligations',
        },
        {
          displayName: 'License/Obligation',
          iconName: 'find_replace',
          route: '/license-obligation',
        },
        {
          displayName: 'License/Exception',
          iconName: 'report_problem',
          route: '/licenses-exceptions',
        },
        {
          displayName: 'Project Status Types',
          iconName: 'check',
          route: '/project-status-types',
        },
        {
          displayName: 'Package Managers',
          iconName: 'library_books',
          route: '/package-managers',
        },
        {
          displayName: 'Output Format',
          iconName: 'mail_outline',
          route: 'output-format-type',
        },
        {
          displayName: 'Tool Tips',
          iconName: 'chat',
          route: '/tooltips',
        },
        {
          displayName: 'System Configuration',
          iconName: 'settings_applications',
          route: '/sys-config',
        },
        {
          displayName: 'Vulnerability/Status/DeploymentType',
          iconName: 'looks_one',
          route: '/vulnerability-status-deployment-type',
        },
      ],
    },
  ];
  @ViewChild('appDrawer', { static: false }) appDrawer: ElementRef;
  isHandset = false;

  private publicNavItems: NavItem[] = [
    {
      displayName: 'Projects',
      iconName: 'dashboard',
      route: 'project',
    },
  ];

  get navItems(): NavItem[] {
    let res = this.publicNavItems;
    if (this.authService.isAdmin) {
      res = [...res, ...this.adminNavItems];
    }

    return res;
  }

  showFooter = true;
  showHeader = true;
  showSidebar = true;
  title = 'barista-web';

  ngAfterViewInit() {
    this.navService.appDrawer = this.appDrawer;
  }

  ngOnInit(): void {
    this.breakpointObserver
      .observe(Breakpoints.Handset)
      .pipe(map(result => result.matches))
      .subscribe(result => {
        this.isHandset = result;
      });

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showHeader = this.activatedRoute.firstChild.snapshot.data.showHeader !== false;
        this.showSidebar = this.activatedRoute.firstChild.snapshot.data.showSidebar !== false;
        this.showFooter = this.activatedRoute.firstChild.snapshot.data.showFooter !== false;
      }
    });
  }
}
