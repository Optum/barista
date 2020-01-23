import { Component, Input, OnInit } from '@angular/core';
import IBreadcrumb from './IBreadcrumb';

/**
 * This component is a simple breadcrumbs component. It allows the last crumb to be selectable or not as well.
 *
 * @Input isLastSelectable {boolean}    If the last crumb should be selectable or not.
 * @Input breadcrumbs {IBreadcrumb[]}   An array of each of the crumbs to be shown.
 */
@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
})
export class BreadcrumbsComponent implements OnInit {
  constructor() {}
  @Input() breadcrumbs: IBreadcrumb[];
  @Input() isLastSelectable = false;

  ngOnInit() {}
}
