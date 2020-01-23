import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { LicenseService } from '@app/shared/+state/license/license.service';
import { License } from '@app/shared/api';
import { AppDialogComponent } from '@app/shared/app-components/app-dialog/app-dialog.component';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-license-details',
  templateUrl: './license-details.component.html',
  styleUrls: ['./license-details.component.scss'],
})
export class LicenseDetailsComponent implements OnInit, OnDestroy {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private licenseService: LicenseService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
  ) {}

  fields: FormlyFieldConfig[] = [
    {
      key: 'name',
      type: 'input',
      templateOptions: {
        label: 'License Name',
        placeholder: 'Enter License Name Here',
        required: true,
      },
    },
    {
      key: 'code',
      type: 'input',
      templateOptions: {
        label: 'Code',
        placeholder: 'Enter License Code Here',
        required: true,
      },
    },
    {
      key: 'desc',
      type: 'input',
      templateOptions: {
        label: 'Description',
        placeholder: 'Enter License Description Here',
        required: true,
      },
    },
    {
      key: 'homepageUrl',
      type: 'input',
      templateOptions: {
        label: 'Homepage URL',
        placeholder: 'Enter License Homepage URL',
        required: false,
      },
    },
  ];
  form = new FormGroup({});
  license: License;
  newLicense = false;

  options: FormlyFormOptions = {
    formState: {
      awesomeIsForced: false,
    },
  };

  ngOnDestroy(): void {}

  ngOnInit() {
    const licenseId = this.route.snapshot.paramMap.get('licenseId');

    if (licenseId === 'new') {
      this.newLicense = true;
      this.license = {
        id: null,
        name: '',
        code: '',
        desc: '',
      } as License;
    } else {
      this.licenseService.setFilter(licenseId);
      this.licenseService.filteredEntities$.pipe(untilDestroyed(this)).subscribe(licenses => {
        if (licenses.length > 0) {
          this.license = { ...licenses[0] };
        } else {
          this.licenseService.getByKey(licenseId);
        }
      });
    }
  }

  submit() {
    if (this.form.valid) {
      if (this.newLicense) {
        this.licenseService
          .add(this.license)
          .pipe(first())
          .subscribe(
            license => {
              this.license = { ...license };
              this.newLicense = false;

              this.snackBar.open(`License ${license.name}`, 'OK', {
                duration: 2000,
                horizontalPosition: 'right',
                verticalPosition: 'top',
              });

              setTimeout(() => {
                return this.router.navigate(['/license', license.id]);
              }, 2000);
            },
            error => {
              this.dialog.open(AppDialogComponent, {
                data: { title: 'Error', message: JSON.stringify(error) },
              });
            },
          );
      } else {
        this.licenseService
          .update(this.license)
          .pipe(first())
          .subscribe(
            license => {
              this.license = { ...license };
              this.snackBar.open(`License ${license.name}`, 'OK', {
                duration: 5000,
                horizontalPosition: 'right',
                verticalPosition: 'top',
              });
            },
            error => {
              this.dialog.open(AppDialogComponent, {
                data: { title: 'Error', message: JSON.stringify(error) },
              });
            },
          );
      }
    }
  }
}
