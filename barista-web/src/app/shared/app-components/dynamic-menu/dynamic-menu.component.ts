import { Component, Input, OnInit } from '@angular/core';
import { SystemConfigurationService } from '@app/shared/+state/systemConfiguration/system-configuration.service';
import IMenuItem from '@app/shared/interfaces/IMenuItem';
import { isArray } from 'lodash';

@Component({
  selector: 'app-dynamic-menu',
  templateUrl: './dynamic-menu.component.html',
  styleUrls: ['./dynamic-menu.component.scss'],
})
export class DynamicMenuComponent implements OnInit {
  @Input() menuBtnTitle = '';
  @Input() menuItemConfigProp: string;

  menuItems: IMenuItem[] = [];

  constructor(private systemConfigService: SystemConfigurationService) {}

  ngOnInit() {
    this.systemConfigService.apiService.systemConfigurationGet().subscribe(data => {
      const menuItems = data[this.menuItemConfigProp];
      this.menuItems = isArray(menuItems) ? menuItems : [];
    });
  }
}
