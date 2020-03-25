import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SystemConfiguration, SystemConfigurationApiService } from '@app/shared/api';
import { AppDialogComponent } from '@app/shared/app-components/app-dialog/app-dialog.component';
import { validateJson } from '@app/shared/helpers';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'app-system-configuration',
  templateUrl: './system-configuration.component.html',
  styleUrls: ['./system-configuration.component.scss'],
})
export class SystemConfigurationComponent implements OnInit, OnDestroy {
  constructor(
    private systemConfigurationApiService: SystemConfigurationApiService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
  ) {}

  fields: FormlyFieldConfig[] = [
    {
      key: 'spdxLicenseListVersion',
      type: 'checkbox',
      templateOptions: {
        label: 'SPDX License List Version',
        required: true,
      },
    },
    {
      key: 'npmCacheDirectory',
      type: 'input',
      templateOptions: {
        label: 'NPM cache directory',
        placeholder: 'Enter NPM Cache directory.',
        required: true,
      },
    },
    {
      key: 'npmRegistry',
      type: 'input',
      templateOptions: {
        label: 'NPM registry',
        placeholder: 'Enter NPM registry.',
        required: true,
      },
    },
    {
      key: 'maxProcesses',
      type: 'input',
      templateOptions: {
        label: 'Max Processes',
        placeholder: 'Max Processes.',
        required: true,
        type: 'number',
      },
    },
    {
      key: 'aboutPageContent',
      type: 'textarea',
      templateOptions: {
        label: 'About Page Content',
        placeholder: 'Enter about page content.',
        required: false,
        rows: 10,
      },
    },
    {
      key: 'helpMenuStr',
      type: 'textarea',
      templateOptions: {
        label: 'Help Menu (JSON)',
        placeholder: 'Enter help menu (JSON formatted)',
        required: false,
        rows: 10,
      },
    },
    {
      key: 'aboutMenuStr',
      type: 'textarea',
      templateOptions: {
        label: 'About Menu (JSON)',
        placeholder: 'Enter about menu (JSON formatted)',
        required: false,
        rows: 10,
      },
    },
    {
      key: 'contactMenuStr',
      type: 'textarea',
      templateOptions: {
        label: 'Contact Menu (JSON)',
        placeholder: 'Enter contact menu (JSON formatted)',
        required: false,
        rows: 10,
      },
    },
    {
      key: 'githubEnterpriseUrlEnvVar',
      type: 'input',
      templateOptions: {
        label: 'Github Enterprise Url Environment variable',
        placeholder: 'Enter Github Enterprise Url Environment variable',
        required: false,
      },
    },
    {
      key: 'githubEnterprisePasswordEnvVar',
      type: 'input',
      templateOptions: {
        label: 'Github Enterprise Password Environment variable',
        placeholder: 'Enter Github Enterprise Password Environment variable',
        required: false,
      },
    },
    {
      key: 'githubEnterpriseUsernameEnvVar',
      type: 'input',
      templateOptions: {
        label: 'Github Enterprise Username Environment variable',
        placeholder: 'Enter Github Enterprise Username Environment variable',
        required: false,
      },
    },
    {
      key: 'githubComUsernameEnvVar',
      type: 'input',
      templateOptions: {
        label: 'Github Username Environment variable',
        placeholder: 'Enter Github Username Environment variable',
        required: false,
      },
    },
    {
      key: 'githubComPasswordEnvVar',
      type: 'input',
      templateOptions: {
        label: 'Github Password Environment variable',
        placeholder: 'Enter Github Password Environment variable',
        required: false,
      },
    },
  ];
  form = new FormGroup({});

  options: FormlyFormOptions = {
    formState: {
      awesomeIsForced: false,
    },
  };
  systemConfiguration: SystemConfiguration & {
    aboutMenuStr: string;
    contactMenuStr: string;
    helpMenuStr: string;
  };

  ngOnDestroy(): void {}

  ngOnInit() {
    this.systemConfigurationApiService
      .systemConfigurationIdGet('default')
      .pipe(untilDestroyed(this))
      .subscribe(data => {
        this.systemConfiguration = {
          ...data,
          aboutMenuStr: data.aboutMenu && JSON.stringify(data.aboutMenu, null, 2),
          helpMenuStr: data.helpMenu && JSON.stringify(data.helpMenu, null, 2),
          contactMenuStr: data.contactMenu && JSON.stringify(data.contactMenu, null, 2),
        };
      });
  }

  async submit() {
    // validate the JSON objects, just to prohibit wrong JSON put in database
    if (!validateJson((this.systemConfiguration.helpMenuStr || '').toString())) {
      this.dialog.open(AppDialogComponent, {
        data: { title: 'Error - Invalid JSON', message: `Help Menu string is not a valid JSON.` },
      });
      return;
    }

    if (!validateJson((this.systemConfiguration.aboutMenuStr || '').toString())) {
      this.dialog.open(AppDialogComponent, {
        data: { title: 'Error - Invalid JSON', message: `About Menu string is not a valid JSON.` },
      });
      return;
    }

    if (!validateJson((this.systemConfiguration.contactMenuStr || '').toString())) {
      this.dialog.open(AppDialogComponent, {
        data: { title: 'Error - Invalid JSON', message: `Contact Menu string is not a valid JSON.` },
      });
      return;
    }

    try {
      this.systemConfiguration.aboutMenu =
        (this.systemConfiguration.aboutMenuStr && JSON.parse(this.systemConfiguration.aboutMenuStr)) || null;
      this.systemConfiguration.contactMenu =
        (this.systemConfiguration.contactMenuStr && JSON.parse(this.systemConfiguration.contactMenuStr)) || null;
      this.systemConfiguration.helpMenu =
        (this.systemConfiguration.helpMenuStr && JSON.parse(this.systemConfiguration.helpMenuStr)) || null;
      const result = {
        ...(await this.systemConfigurationApiService
          .systemConfigurationIdPatch(this.systemConfiguration.code, this.systemConfiguration)
          .toPromise()),
      };
      this.systemConfiguration = {
        ...result,
        aboutMenuStr: result.aboutMenu && JSON.stringify(result.aboutMenu, null, 2),
        helpMenuStr: result.helpMenu && JSON.stringify(result.helpMenu, null, 2),
        contactMenuStr: result.contactMenu && JSON.stringify(result.contactMenu, null, 2),
      };
      this.snackBar.open(`System configuration successfully updated.`, 'OK', {
        duration: 5000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
      });
    } catch (error) {
      this.dialog.open(AppDialogComponent, {
        data: { title: 'Error', message: JSON.stringify(error) },
      });
    }
  }
}
