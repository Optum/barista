import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @CreateDateColumn({ name: 'created_at', nullable: false })
  createdAt: Date;

  @Column({ name: 'display_name', default: '' })
  displayName: string;

  @PrimaryColumn()
  id: string;

  // TODO: Make sure this is a header doc compatible comment...
  // used mainly for easy of working with authentication on developers machines
  // without AD
  isLocal: boolean;

  @Column({ name: 'password_hash', nullable: false })
  passwordHash: string;

  @Column({ nullable: false })
  role: string;

  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updatedAt: Date;

  @Column({ name: 'user_name', nullable: false })
  userName: string;
}

export enum UserRole {
  Admin = 'Admin',
  LicenseAdmin = 'LicenseAdmin',
  SecurityAdmin = 'SecurityAdmin',
  Collaborator = 'Collaborator',
}
