import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { ObligationService } from '@app/shared/+state/obligation/obligation.service';
import { Obligation } from '@app/shared/api';
import { AppDialogComponent } from '@app/shared/app-components/app-dialog/app-dialog.component';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-obligation-details',
  templateUrl: './obligation-details.component.html',
  styleUrls: ['./obligation-details.component.scss'],
})
export class ObligationDetailsComponent implements OnInit, OnDestroy {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private obligationService: ObligationService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
  ) {}

  fields: FormlyFieldConfig[] = [
    {
      key: 'name',
      type: 'input',
      templateOptions: {
        label: 'Obligation Name',
        placeholder: 'Enter Obligation Name Here',
        required: true,
      },
    },
    {
      key: 'code',
      type: 'input',
      templateOptions: {
        label: 'Code',
        placeholder: 'Enter Obligation Code Here',
        required: true,
      },
    },
    {
      key: 'desc',
      type: 'input',
      templateOptions: {
        label: 'Description',
        placeholder: 'Enter Obligation Description Here',
        required: true,
      },
    },
  ];
  form = new FormGroup({});
  newObligation = false;
  obligation: Obligation;

  options: FormlyFormOptions = {
    formState: {
      awesomeIsForced: false,
    },
  };

  ngOnDestroy(): void {}

  ngOnInit() {
    const obligationId = this.route.snapshot.paramMap.get('obligationId');

    if (obligationId === 'new') {
      this.newObligation = true;
      this.obligation = {
        id: null,
        name: '',
        code: '',
        desc: '',
      } as Obligation;
    } else {
      this.obligationService.setFilter(obligationId);
      this.obligationService.filteredEntities$.pipe(untilDestroyed(this)).subscribe(obligations => {
        if (obligations.length > 0) {
          this.obligation = { ...obligations[0] };
        } else {
          this.obligationService.getByKey(obligationId);
        }
      });
    }
  }

  submit() {
    if (this.form.valid) {
      if (this.newObligation) {
        this.obligationService
          .add(this.obligation)
          .pipe(first())
          .subscribe(
            obligation => {
              this.obligation = { ...obligation };
              this.newObligation = false;

              this.snackBar.open(`Obligation ${obligation.name}`, 'OK', {
                duration: 2000,
                horizontalPosition: 'right',
                verticalPosition: 'top',
              });

              setTimeout(() => {
                return this.router.navigate(['/obligation', obligation.id]);
              }, 2000);
            },
            error => {
              this.dialog.open(AppDialogComponent, {
                data: { title: 'Error', message: JSON.stringify(error) },
              });
            },
          );
      } else {
        this.obligationService
          .update(this.obligation)
          .pipe(first())
          .subscribe(
            obligation => {
              this.obligation = { ...obligation };
              this.snackBar.open(`Obligation ${obligation.name}`, 'OK', {
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
