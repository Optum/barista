import { Column, Entity } from 'typeorm';
import { ModelBase } from './ModelBase';

@Entity()
export class LegacyCommunityProjectImport extends ModelBase {
  @Column({ name: 'application_deployment', nullable: true })
  applicationDeployment: string;

  @Column({ name: 'application_desc', nullable: true })
  applicationDesc: string;
  @Column({ name: 'application_id', nullable: true })
  applicationId: string;

  @Column({ name: 'application_name', nullable: true })
  applicationName: string;

  @Column({ name: 'application_owner_email', nullable: true })
  applicationOwnerEmail: string;

  @Column({ name: 'application_owner_msid', nullable: true })
  applicationOwnerMsid: string;

  @Column({ name: 'component_approval_timestamp', nullable: true })
  componentApprovalTimestamp: string;

  @Column({ name: 'component_id', nullable: true })
  componentId: string;

  @Column({ name: 'component_license', nullable: true })
  componentLicense: string;

  @Column({ name: 'component_licenseid', nullable: true })
  componentLicenseid: string;

  @Column({ name: 'component_name', nullable: true })
  componentName: string;

  @Column({ name: 'component_version', nullable: true })
  componentVersion: string;

  @Column({ name: 'data_source', nullable: true })
  dataSource: string;
}
