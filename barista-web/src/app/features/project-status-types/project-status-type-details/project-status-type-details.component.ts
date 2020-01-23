import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectStatusTypeService } from '@app/shared/+state/projectStatusType/project-status-type.service';
import { ProjectStatusType } from '@app/shared/api';
import { AppDialogComponent } from '@app/shared/app-components/app-dialog/app-dialog.component';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-project-status-type-details',
  templateUrl: './project-status-type-details.component.html',
  styleUrls: ['./project-status-type-details.component.scss'],
})
export class ProjectStatusTypeDetailsComponent implements OnInit, OnDestroy {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectStatusTypeService: ProjectStatusTypeService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
  ) {}

  fields: FormlyFieldConfig[] = [
    {
      key: 'code',
      type: 'input',
      templateOptions: {
        label: 'Project Status Code',
        placeholder: 'Enter Project Status Code Here',
        required: true,
      },
    },
    {
      key: 'description',
      type: 'input',
      templateOptions: {
        label: 'Description',
        placeholder: 'Enter Project Status Description Here',
        required: true,
      },
    },
  ];
  form = new FormGroup({});
  newProjectStatusType = false;

  options: FormlyFormOptions = {
    formState: {
      awesomeIsForced: false,
    },
  };
  projectStatusType: ProjectStatusType;

  ngOnDestroy(): void {}

  ngOnInit() {
    const projectStatusTypeId = this.route.snapshot.paramMap.get('projectStatusTypeId');

    if (projectStatusTypeId === 'new') {
      this.newProjectStatusType = true;
      this.projectStatusType = {
        code: '',
        description: '',
      } as ProjectStatusType;
    } else {
      this.projectStatusTypeService.setFilter(projectStatusTypeId);
      this.projectStatusTypeService.filteredEntities$.pipe(untilDestroyed(this)).subscribe(projectStatusTypes => {
        if (projectStatusTypes.length > 0) {
          this.projectStatusType = { ...projectStatusTypes[0] };
        } else {
          this.projectStatusTypeService.getByKey(projectStatusTypeId);
        }
      });
    }
  }

  submit() {
    if (this.form.valid) {
      if (this.newProjectStatusType) {
        this.projectStatusTypeService
          .add(this.projectStatusType)
          .pipe(first())
          .subscribe(
            projectStatusType => {
              this.projectStatusType = { ...projectStatusType };
              this.newProjectStatusType = false;

              this.snackBar.open(`Project Status Type ${projectStatusType.description}`, 'OK', {
                duration: 2000,
                horizontalPosition: 'right',
                verticalPosition: 'top',
              });

              setTimeout(() => {
                return this.router.navigate(['/project-status-types', projectStatusType.code]);
              }, 2000);
            },
            error => {
              this.dialog.open(AppDialogComponent, {
                data: { title: 'Error', message: JSON.stringify(error) },
              });
            },
          );
      } else {
        this.projectStatusTypeService
          .update(this.projectStatusType)
          .pipe(first())
          .subscribe(
            projectStatusType => {
              this.projectStatusType = { ...projectStatusType };
              this.snackBar.open(`Project Status Type ${projectStatusType.description}`, 'OK', {
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
