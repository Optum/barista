import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { ToolTip, ToolTipApiService } from '@app/shared/api';
import { AppDialogComponent } from '@app/shared/app-components/app-dialog/app-dialog.component';
import { ToolTipsDataChangedMessageService } from '@app/shared/services/ToolTipsDataChangedMessageService';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';

@Component({
  selector: 'app-tooltips-details',
  templateUrl: './tooltip-details.component.html',
  styleUrls: ['./tooltip-details.component.scss'],
})
export class TooltipDetailsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toolTipService: ToolTipApiService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private toolTipsDataChangedMessageService: ToolTipsDataChangedMessageService,
  ) {}

  fields: FormlyFieldConfig[] = [
    {
      key: 'pageName',
      type: 'input',
      templateOptions: {
        label: 'Page Name',
        placeholder: 'Enter Page Name Here',
        required: true,
        readonly: true,
      },
    },
    {
      key: 'elementName',
      type: 'input',
      templateOptions: {
        label: 'Element Name',
        placeholder: 'Enter Element Name Here',
        required: true,
        readonly: true,
      },
    },
    {
      key: 'content',
      type: 'input',
      templateOptions: {
        label: 'Content',
        placeholder: 'Enter Content Here',
        required: true,
      },
    },
    {
      key: 'enabled',
      type: 'checkbox',
      templateOptions: {
        label: 'Enabled',
        placeholder: 'Enabled',
        required: true,
      },
    },
  ];
  form = new FormGroup({});
  newToolTip = false;

  options: FormlyFormOptions = {
    formState: {
      awesomeIsForced: false,
    },
  };

  toolTip: ToolTip;

  async ngOnInit() {
    const toolTipId = this.route.snapshot.paramMap.get('toolTipId');

    if (toolTipId === 'new') {
      throw new Error('Adding tooltips via UI not supported.');
    } else {
      this.toolTip = await this.toolTipService.tooltipIdGet(+toolTipId).toPromise();
    }
  }

  async submit() {
    if (this.form.valid) {
      if (this.newToolTip) {
        // not supported adding tooltips
      } else {
        try {
          this.toolTip = { ...(await this.toolTipService.tooltipIdPatch(this.toolTip.id, this.toolTip).toPromise()) };
          this.snackBar.open(`ToolTip for ${this.toolTip.pageName} for element ${this.toolTip.elementName}`, 'OK', {
            duration: 5000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });
          this.toolTipsDataChangedMessageService.send('');
        } catch (error) {
          this.dialog.open(AppDialogComponent, {
            data: { title: 'Error', message: JSON.stringify(error) },
          });
        }
      }
    }
  }
}
