import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'app-formly-form-flex',
  template: `
    <div class="content" [fxLayout]="to.fxLayout" fxLayout.xs="column" fxFlexFill>
      <formly-field *ngFor="let f of field.fieldGroup" [field]="f"> </formly-field>
    </div>
  `,
})
export class FlexLayoutTypeComponent extends FieldType {}
