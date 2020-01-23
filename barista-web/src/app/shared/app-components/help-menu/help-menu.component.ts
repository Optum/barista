import { Component, OnInit } from '@angular/core';
import { SystemConfigurationService } from '@app/shared/+state/systemConfiguration/system-configuration.service';
import IMenuItem from '@app/shared/interfaces/IMenuItem';
import { isArray } from 'lodash';

@Component({
  selector: 'app-help-menu',
  templateUrl: './help-menu.component.html',
  styleUrls: ['./help-menu.component.scss'],
})
export class HelpMenuComponent implements OnInit {
  helpMenuItems: IMenuItem[] = [];

  constructor(private systemConfigService: SystemConfigurationService) {}

  ngOnInit() {
    this.systemConfigService.apiService.systemConfigurationIdGet('default').subscribe(data => {
      this.helpMenuItems = isArray(data.helpMenu) ? data.helpMenu : [];
    });
  }
}
