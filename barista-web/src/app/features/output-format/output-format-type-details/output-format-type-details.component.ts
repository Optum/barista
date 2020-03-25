import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { OutputFormatTypeService } from '@app/shared/+state/outputFormatType/output-format-type.service';
import { OutputFormatType } from '@app/shared/api';
import { AppDialogComponent } from '@app/shared/app-components/app-dialog/app-dialog.component';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-output-format-type-details',
  templateUrl: './output-format-type-details.component.html',
  styleUrls: ['./output-format-type-details.component.scss'],
})
export class OutputFormatTypeDetailsComponent implements OnInit, OnDestroy {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private outputFormatTypeService: OutputFormatTypeService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
  ) {}

  fields: FormlyFieldConfig[] = [
    {
      key: 'name',
      type: 'input',
      templateOptions: {
        label: 'Output Format Type Name',
        placeholder: 'Enter Output Format Type Name Here',
        required: true,
      },
    },
    {
      key: 'code',
      type: 'input',
      templateOptions: {
        label: 'Code',
        placeholder: 'Enter Output Format Type Code Here',
        required: true,
      },
    },
    {
      key: 'description',
      type: 'input',
      templateOptions: {
        label: 'Description',
        placeholder: 'Enter Output Format Type Description Here',
        required: true,
      },
    },
  ];
  form = new FormGroup({});
  newOutputFormatType = false;

  options: FormlyFormOptions = {
    formState: {
      awesomeIsForced: false,
    },
  };
  outputFormatType: OutputFormatType;

  ngOnDestroy(): void {}

  ngOnInit() {
    const outputFormatTypeId = this.route.snapshot.paramMap.get('outputFormatTypeCode');

    if (outputFormatTypeId === 'new') {
      this.newOutputFormatType = true;
      this.outputFormatType = {
        code: '',
        description: '',
      } as OutputFormatType;
    } else {
      this.outputFormatTypeService.setFilter(outputFormatTypeId);
      this.outputFormatTypeService.filteredEntities$.pipe(untilDestroyed(this)).subscribe(outputFormatTypes => {
        if (outputFormatTypes.length > 0) {
          this.outputFormatType = { ...outputFormatTypes[0] };
        } else {
          this.outputFormatTypeService.getByKey(outputFormatTypeId);
        }
      });
    }
  }

  submit() {
    if (this.form.valid) {
      if (this.newOutputFormatType) {
        this.outputFormatTypeService
          .add(this.outputFormatType)
          .pipe(first())
          .subscribe(
            outputFormatType => {
              this.outputFormatType = { ...outputFormatType };
              this.newOutputFormatType = false;

              this.snackBar.open(`Output Format Type ${outputFormatType.code}`, 'OK', {
                duration: 2000,
                horizontalPosition: 'right',
                verticalPosition: 'top',
              });

              setTimeout(() => {
                // this was a spot of confusion
                return this.router.navigate(['/output-format-type', outputFormatType.code]);
              }, 2000);
            },
            error => {
              this.dialog.open(AppDialogComponent, {
                data: { title: 'Error', message: JSON.stringify(error) },
              });
            },
          );
      } else {
        this.outputFormatTypeService
          .update(this.outputFormatType)
          .pipe(first())
          .subscribe(
            outputFormatType => {
              this.outputFormatType = { ...outputFormatType };
              this.snackBar.open(`Output Format Type ${outputFormatType.code}`, 'OK', {
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
