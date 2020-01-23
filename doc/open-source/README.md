# Barista Open Source Migration

This document describes adjustments to the Barista system that would be required in order to release the code to the public as open source.

# Common Items

## Documentation

* Evaluate the current documentation and inventory documentation sets that might need to be created or expanded.
* Examine documentation platform candidates such as Docusaurus or Gitbook that might be used to standardized documentation production and maintenance.
* Candidates for documentation sets might include:
  * Product Overview
  * Deployment Quick Start
  * Developer Quick Start
  * User Guide
  * API Documentation
  * Compodoc/Header Documentation

## CI/CD

* Separate UHG specific CI/CD artifacts so that these are not distributed with the product as open source.

## Developer Quick Start / Eval

* Add Barista specific Docker images that are not UHG specific.
* Ensure that the system can be easily started with Docker Compose and that clear documentation exists to provide an easy evaluation experience to interested public parties.

# Web

* Ensure that the system is operational in both an LDAP/AD as well as local database authentication environment.
* Evaluate UHG specific fields in the product such as the "Ask ID" and determine how those fields might be represented in the final product.

# Api

* Evaluate the usage of UHG specific environment variables and ensure that the configuration of these mechanisms are suitable for public release.
  * If not, how might they be adjusted?
* Evaluate the implementation of UHG specific proxy mechanisms and ensure that these configurations are flexible enough to be used by environments outside UHG.

# Scan

* Evaluate the usage of UHG specific environment variables and ensure that the configuration of these mechanisms are suitable for public release.
  * If not, how might they be adjusted?
