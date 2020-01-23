# Barista Authentication

The Barista autentication subsystem is controlled by a series of environment variables configured in the system. 
A detail of these environment variables and their purpose is given below:

## Environment Variables 

* AUTH_TYPE: Set to `ldap` to enable LDAP authentication, otherwise blank or any other value for local database autentication.
* LDAP_SERVER: The URL of the LDAP server to authenticate against. e.g. `ldap://your.company.com`
* LDAP_BASE: The base URN against which to perform authentication, e.g. `cn=users,dc=co,dc=us,dc=yourcompany,dc=com`
* LDAP_GROUP: The group that a user must belong to in order to use the system, e.g. `mortal_users`
* LDAP_ADMIN_GROUP: The group that a user must belong to in order to administrate the system, e.g. `admin_users`
* LDAP_LICENSE_ADMIN_GROUP: The group that a user must belong to in order to administrate licenses the system, e.g. `license_admin_users`
* LDAP_SECURITY_ADMIN_GROUP: The group that a user must belong to in order to administrate security the system, e.g. `security_admin_users`
* JWT_SECRET: A salt used to generate the JWT token. See the `secretOrKey` here: http://www.passportjs.org/packages/passport-jwt/
