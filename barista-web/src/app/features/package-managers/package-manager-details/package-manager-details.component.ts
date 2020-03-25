import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { PackageManagerService } from '@app/shared/+state/packageManager/package-manager.service';
import { PackageManager } from '@app/shared/api';
import { AppDialogComponent } from '@app/shared/app-components/app-dialog/app-dialog.component';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-package-manager-details',
  templateUrl: './package-manager-details.component.html',
  styleUrls: ['./package-manager-details.component.scss'],
})
export class PackageManagerDetailsComponent implements OnInit, OnDestroy {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private packageManagerService: PackageManagerService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
  ) {}

  fields: FormlyFieldConfig[] = [
    {
      key: 'code',
      type: 'input',
      templateOptions: {
        label: 'Code',
        placeholder: 'Enter Package Manager Code Here',
        required: true,
      },
    },
    {
      key: 'description',
      type: 'input',
      templateOptions: {
        label: 'Description',
        placeholder: 'Enter Package Manager Description Here',
        required: true,
      },
    },
  ];
  form = new FormGroup({});
  newPackageManager = false;

  options: FormlyFormOptions = {
    formState: {
      awesomeIsForced: false,
    },
  };
  packageManager: PackageManager;

  ngOnDestroy(): void {}

  ngOnInit() {
    const packageManagerId = this.route.snapshot.paramMap.get('packageManagerId');

    if (packageManagerId === 'new') {
      this.newPackageManager = true;
      this.packageManager = {
        code: '',
        description: '',
      } as PackageManager;
    } else {
      this.packageManagerService.setFilter(packageManagerId);
      this.packageManagerService.filteredEntities$.pipe(untilDestroyed(this)).subscribe(packageManagers => {
        if (packageManagers.length > 0) {
          this.packageManager = { ...packageManagers[0] };
        } else {
          this.packageManagerService.getByKey(packageManagerId);
        }
      });
    }
  }

  submit() {
    if (this.form.valid) {
      if (this.newPackageManager) {
        this.packageManagerService
          .add(this.packageManager)
          .pipe(first())
          .subscribe(
            packageManager => {
              this.packageManager = { ...packageManager };
              this.newPackageManager = false;

              this.snackBar.open(`Package Manager ${packageManager.description}`, 'OK', {
                duration: 2000,
                horizontalPosition: 'right',
                verticalPosition: 'top',
              });

              setTimeout(() => {
                return this.router.navigate(['/package-manager', packageManager.code]);
              }, 2000);
            },
            error => {
              this.dialog.open(AppDialogComponent, {
                data: { title: 'Error', message: JSON.stringify(error) },
              });
            },
          );
      } else {
        this.packageManagerService
          .update(this.packageManager)
          .pipe(first())
          .subscribe(
            packageManager => {
              this.packageManager = { ...packageManager };
              this.snackBar.open(`Package Manager ${packageManager.description}`, 'OK', {
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
