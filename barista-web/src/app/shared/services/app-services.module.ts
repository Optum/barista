import { NgModule } from '@angular/core';
import { BomGlobalFilterMessageService } from '@app/shared/services/BomGlobalFilterMessageService';
import { BomLicenseExceptionOperationMessageService } from '@app/shared/services/BomLicenseExceptionOperationMessageService';
import { BomSecurityExceptionOperationMessageService } from '@app/shared/services/BomSecurityExceptionOperationMessageService';
import { ProjectDetailsTabChangedMessageService } from '@app/shared/services/ProjectDetailsTabChangedMessageService';
import { ProjectNotesOperationMessageService } from '@app/shared/services/ProjectNotesOperationMessageService';
import { ToolTipsCacheService } from '@app/shared/services/ToolTipsCacheService';
import { ToolTipsDataChangedMessageService } from '@app/shared/services/ToolTipsDataChangedMessageService';

@NgModule({
  providers: [
    BomGlobalFilterMessageService,
    ProjectNotesOperationMessageService,
    BomLicenseExceptionOperationMessageService,
    BomSecurityExceptionOperationMessageService,
    ProjectDetailsTabChangedMessageService,
    ToolTipsCacheService,
    ToolTipsDataChangedMessageService,
  ],
})
export class AppServicesModule {}
