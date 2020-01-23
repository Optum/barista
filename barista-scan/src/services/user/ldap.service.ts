import { UserRole } from '@app/models/User';
import { Injectable, Logger } from '@nestjs/common';
import * as _ from 'lodash';
import LdapClient from 'promised-ldap';
import { UserInfo } from '../../models/DTOs';

@Injectable()
export class LdapService {
  constructor() {
    this.ldapConfig = {
      url: process.env.LDAP_SERVER,
      base: process.env.LDAP_BASE,
      group: process.env.LDAP_GROUP || 'barista_collaborators',
      adminGroup: process.env.LDAP_ADMIN_GROUP || 'barista_admin',
      licenseAdminGroup: process.env.LDAP_LICENSE_ADMIN_GROUP || 'barista_license_admin',
      securityAdminGroup: process.env.LDAP_SECURITY_ADMIN_GROUP || 'barista_security_admin',
    };
  }

  ldapConfig: any;
  logger = new Logger('LdapService');

  createLdapClient(): LdapClient {
    return new LdapClient({
      url: this.ldapConfig.url,
      tlsOptions: { rejectUnauthorized: false },
    });
  }

  getUserGroups(userName: string, pass: string): Promise<string[]> {
    const ldapClient = this.createLdapClient();
    const searchUser = `cn=${userName},${this.ldapConfig.base}`;

    return ldapClient
      .bind(searchUser, pass)
      .then(() => {
        return ldapClient
          .search(searchUser, {
            scope: 'sub',
            filter: `(&(objectClass=user)(sAMAccountName=${userName}))`,
            attributes: ['cn', 'displayName', 'givenName', 'sn', 'mail', 'group', 'gn', 'memberOf'],
          })
          .then(result => {
            try {
              if (_.isEmpty(result.entries)) {
                // not a primary account
                this.logger.warn(`User ${userName} doesn't belong to any groups.`);
                return [];
              }

              const memberOf = result.entries[0].object.memberOf;
              this.logger.log(`User ${userName} is member of ${memberOf}`);

              if (memberOf) {
                const groups = memberOf
                  .map(g => g.split(',')[0])
                  .map(s => s.replace(/(.*)=(.*)/, '$2'))
                  .map(group => group.toLowerCase());
                const baristaGroups = _.filter(groups, group => group.startsWith('barista_'));
                this.logger.log(`User ${userName} is member of the following barista groups: ${baristaGroups}`);
                return baristaGroups;
              }
              return [];
            } finally {
              ldapClient.unbind();
            }
          });
      })
      .catch(e => {
        this.logger.error(`AD Groups query error: ${e}`);
        return null;
      });
  }

  getUserRole(groups: string[]): UserRole {
    if (_.findIndex(groups, group => group.startsWith('CN=' + this.ldapConfig.adminGroup)) !== -1) {
      return UserRole.Admin;
    }

    if (_.findIndex(groups, group => group.startsWith('CN=' + this.ldapConfig.licenseAdminGroup)) !== -1) {
      return UserRole.LicenseAdmin;
    }

    if (_.findIndex(groups, group => group.startsWith('CN=' + this.ldapConfig.securityAdminGroup)) !== -1) {
      return UserRole.SecurityAdmin;
    }

    return UserRole.Collaborator;
  }

  validateUser(userName: string, pass: string): Promise<UserInfo> {
    const client = this.createLdapClient();

    const searchUser = `cn=${userName},${this.ldapConfig.base}`;
    const adGroups = [
      this.ldapConfig.adminGroup,
      this.ldapConfig.licenseAdminGroup,
      this.ldapConfig.securityAdminGroup,
      this.ldapConfig.group,
    ];
    const adGroupsFilter =
      '(|' + adGroups.map(group => `(memberOf=CN=${group},${this.ldapConfig.base})`).join('') + ')';
    this.logger.log(`AD Groups Filter ${adGroupsFilter}`);
    return client
      .bind(searchUser, pass)
      .then(() => {
        return client
          .search(searchUser, {
            scope: 'sub',
            filter: `(&(objectClass=user)(sAMAccountName=${userName})${adGroupsFilter})`,
            attributes: ['cn', 'displayName', 'givenName', 'sn', 'mail', 'group', 'gn', 'memberOf'],
          })
          .then(result => {
            try {
              if (_.isEmpty(result.entries)) {
                // not a primary account
                this.logger.warn(`User ${userName} doesn't belong to any groups.`);
                return null;
              }

              // this.logger.log(`AD answer: ${result.entries.map(entryLocal => JSON.stringify(entryLocal.object))}`);
              const memberOf = result.entries[0].object.memberOf;

              // Only look at the first response
              const entry = result.entries[0].object;
              const userInfo: UserInfo = {
                id: entry.cn,
                displayName: entry.displayName,
                userName,
                role: this.getUserRole(memberOf),
                email: entry.mail,
                groups: [],
              };

              return userInfo;
            } finally {
              client.unbind();
            }
          });
      })
      .catch(e => {
        this.logger.error(`AD query error: ${e}`);
        return null;
      });
  }
}
