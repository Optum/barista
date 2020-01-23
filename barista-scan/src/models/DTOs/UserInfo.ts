import { UserRole } from '@app/models/User';
import { ApiModelProperty } from '@nestjs/swagger';

export class UserInfo {
  @ApiModelProperty()
  displayName: string;

  @ApiModelProperty()
  email: string;

  @ApiModelProperty()
  groups: string[];

  @ApiModelProperty()
  id: string;

  @ApiModelProperty({
    enum: [UserRole.Admin, UserRole.Collaborator, UserRole.LicenseAdmin, UserRole.SecurityAdmin],
    type: UserRole,
  })
  role: UserRole;

  @ApiModelProperty()
  userName: string;
}
