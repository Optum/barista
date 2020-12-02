---
id: setup-admin-tables
title: How to Setup Admin Tables
sidebar_label: setup-admin-tables
---

Barista requires a certain amount of administrative configuration to be the most effective.  Most of the configuration tables can be maintained through the UI for a user with admin privileges.


1. `Licenses Table` is initially loaded upon startup by the API module.  [SPDX standard licenses](https://github.com/spdx/license-list-data/blob/master/json/licenses.json) are loaded based on the SPDX license version stored in the system_configuration table.  See more detail [here](licenses).
1. `Obligations Table` requires user configuration.  Add both generic and license specific rules here.  For example, a generic rule applicable to most open source licenses is for attribution _"All copyright, patent, trademark and attribution notices from the components must be retained."_
1. `License/Obligation Table` is where you associate your obligations defined in the obligations table to licenses in the licenses table.  You can customize these associations however you like, and update them on the fly.  The UI/UX is very efficient allowing mass updates to save time.  Note that since new licenses or variations of licenses are discovered regularly through the scanning process, the admin needs to revisit these associations regularly to ensure newly discovered licenses have at least basic rules assigned to them.
1. `License/Exception Table` is where you define business rules for deployment types by license.  For example, you can create a rule which flags a red status for GPL licenses found in a project with a Distributed deployment model.  Note that no exceptions for a particular license and deployment combination yields a green status.
1. `Vulnerability/Status/Deployment Type` similar to license exceptions described above, this is where the admin sets business rules for what level of discovered vulnerabilities receive security scan status ratings based on deployment types.  For example, most businesses would want to set Critical findings to Red status for all but internal deployments, which might be designated as Yellow.  Again, no rules for a particular vulnerability finding and deployment model combination yields a green status.
1. `Project Status Types` is reserved for future use.
with a new version number.
1. `Package Managers` contains the list of supported tech stacks for dependency discovery.  A new entry here must be paired with the appropriate code in the Scan module.
1. `Output Format` is reserved for future use.
1. `Tool Tips` allows maintenance of the tool tips function currently only enabled for the project details page.    
1. `System Configuration` allows for administrative maintenance of most configurable fields on the system_configuration table.
