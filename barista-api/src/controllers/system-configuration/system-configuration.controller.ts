import { SystemConfiguration } from '@app/models/SystemConfiguration';
import { SystemConfigurationService } from '@app/services/system-configuration/system-configuration.service';
import { Controller, Get } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';

@Crud({
  model: {
    type: SystemConfiguration,
  },
  routes: {
    exclude: ['deleteOneBase', 'createOneBase'],
  },
  params: {
    id: {
      field: 'code',
      type: 'string',
      primary: true,
    },
  },
})
@ApiUseTags('SystemConfiguration')
@Controller('system-configuration')
export class SystemConfigurationController implements CrudController<SystemConfiguration> {
  constructor(public service: SystemConfigurationService) {}

  @Get()
  async defaultConfiguration(): Promise<any> {
    return SystemConfiguration.defaultConfiguration();
  }
}
