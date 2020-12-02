---
id: setup-scan-project
title: How to Setup a Scan Project
sidebar_label: setup-scan-project
---


1. `Project Name` is user defined - note that certain special characters such as "()" are not supported and will cause errors during scan operations
1. `GitHub Repo` is the full URL to your source code repository e.g. `https://github.com/atom/atom`
1. `Package Manager` should match your tech stack's dependency management process.  Choosing `None` will default to a simple scan of your repo without pulling dependencies using the scancode-toolkit.
1. `Custom Package Manager Path` is optional but will allow you to designate the location of a package manifest file deeper in your repo.  e.g. `src/` would indicate to drill down to the `src` directory to find the package.json file for an NPM project.
1. `Custom Package Manager Filename` is optional but supports non-standard package manifest file names.  e.g. `pom.xml` is normal for a Maven project but Maven supports any name you choose.
1. `Requested Version` is user defined but required.  It can be used to track multiple versions of your project if desired.  Simply re-create your project
with a new version number.
1. `ASK ID` is user defined to allow tracking an outside application ID for reporting purposes.  The column name can be renamed in the system configuration table.
1. `Owner` defaults the name associated with the authenticated user but is purely informational.
1. `Deployment Type` is critical to proper application of license business rules
    * **Distributed** indicates your application will be shipped external to your organization for deployment elsewhere
    * **Externally Facing Internal Hosted** indicates your application will be housed internally but access provided to outside entities - e.g. a web site or hosted API
    * **Internally Consumed** indicates your application will only be exposed or used on your internal network
1. `Path to upload file for scanning` allows for the situation where your code is not available from a Git compatible repository.  This feature requires a valid URL ending with a compressed archive filename.  Most compression formats are supported; zip, tar etc.  GitHub Repo field must be blank for this feature to work.
1. `Output` is not currently used but envisioned for certain reporting or export needs
1. `Output Email` requires a valid SMTP formatted email address - user@domain.com
1. `Project Development Type` is used to distinguish between your organizational development projects and external open source projects you simply intend to consume as is.  If this field is set to community and the GitHub repo field is blank, Barista will allow the user to manually indicate the applicable license and will do a simple name and version lookup on nvd.nist.gov to discover any documented vulnerabilities.
1. `Project Description` is user defined.
