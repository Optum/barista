# License Scanners
* License scanners are implemented per package manager.
* The package manager type should be specifed by the project so that the correct license detection mechanism can be used.
* If a package manager is not specified then a best effort detection attempt is made using common norms for each package manager. 
  * e.g. does a package.json or pom.xml exist in the project root?

## NPM
* [License Checker](https://github.com/davglass/license-checker)

## Maven
* [License Maven Plugin](https://www.mojohaus.org/license-maven-plugin/aggregate-download-licenses-mojo.html)

## Nuget
* A custom solution that combines fetching the specified license if one is not stored locally and then interrogating the local `.nuspec` package files using [Scan Code](https://github.com/nexB/scancode-toolkit)

## None
* If a project does not specify a package manager or one cannot be detected, then the [Scan Code](https://github.com/nexB/scancode-toolkit) toolkit is used to scan the individual files.
* This approach is considered inefficient and computationally expensive.
* Scan code results can be exceedingly verbose, reporting a license detection for every file.

# General License Logic
* Licenses are loaded from the [SPDX](https://spdx.org/) database.
  * See: [Licenses](../../barista-api/docs/licenses.md) in the `barista-api` documentation.
* Licenses are first checked by comparing their name with a known SPDX license expression using the [SPDX-Correct](https://www.npmjs.com/package/spdx-correct) library.
* If an SPDX identifier cannot be inferred from the string detected by the license scanner, then a fuzzy match is attempted using the [string-similarity](https://www.npmjs.com/package/string-similarity) library.
  * A similarity score of 20% or more is required to be deemed "similar"
  * If there is more than one match detected, the match with the highest similarity score is taken.
  * If a license is "fuzzy matched" then a `.fuzzyMatched` Boolean is set to `true` on the license scan result item in case the result needs to be reviewed by a human later.
* If a detected license cannot be matched against an existing license in the system, then a new license is created. 
* If a new license is created the a `.unknownLicense` Boolean is set to `true` on the license in case it needs to be reviewed by a human later.