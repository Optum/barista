---
id: licenses
title: License Implementation
sidebar_label: licenses
---


This document details the License implementation for the system.

## SPDX Licenses
* The system uses SPDX Licenses for a common way to identify licenses.
More information can be found here: https://spdx.org/licenses/

## Updating Licenses
* From time to time licenses may need to be updated. Current machine readable SPDX licenses can be found here: https://github.com/spdx/license-list-data/blob/master/json/licenses.json
* The latest license .json can be downloaded using the `yarn spdx:update` command.
   * This command stores the downloaded file at `barista-api/src/services/license/spdx-licenses.json`
* The specific version of the license file is persisted in the `SystemConfiguration` object of the application after the latest spdx license.json file is loaded on api application startup.
* On subsequent api application starts the license file version is compared with that stored in `SystemConfiguration`. If they are different the new `spdx-licenses.json` is loaded. Licenses are updated or added but never deleted.
