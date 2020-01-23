import bcrypt from 'bcrypt';
import { User } from '../../models';
import { UserRole } from '../../models/User';

export const AdminUsersTypeSeed: Array<Partial<User>> = [
  {
    id: 'admin-id',
    userName: 'Admin',
    displayName: 'Administrator',
    passwordHash: bcrypt.hashSync('$barista@admin', 10),
    role: UserRole.Admin,
  },
  {
    id: 'security-admin-id',
    userName: 'SecurityAdmin',
    displayName: 'Securities Administrator',
    passwordHash: bcrypt.hashSync('$barista@security-admin', 10),
    role: UserRole.SecurityAdmin,
  },
  {
    id: 'license-admin-id',
    userName: 'LicenseAdmin',
    displayName: 'Licenses Administrator',
    passwordHash: bcrypt.hashSync('$barista@license-admin', 10),
    role: UserRole.LicenseAdmin,
  },
  {
    id: 'collaborator-id',
    userName: 'Collaborator',
    displayName: 'Collaborator',
    passwordHash: bcrypt.hashSync('$barista@collaborator', 10),
    role: UserRole.Collaborator,
  },
];
