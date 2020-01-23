# Scanning

Barista is powered by various scans to determine the project's licensing with respect to any included components as well as any known vulnerabilities those dependencies might have. Details on installation of these tools can be found in the [developer bootstrap docs](./bootstrap.md#development-environment).

## Types of Scans

### Project License Scan – implemented ✅

The most basic scan recursively traverses the project directory looking for either license files or project files that include license text. It does this by utilizing Fossology's `nomossa` regular expression based scanning utility.

### Dependency Vulnerability Scan – implemented ✅

This scan type performs a security vulnerability analysis of project's included components using the OWASP `dependency-check` tool. The usefulness of this report is greatly enhanced when the project contains a manifest enumerating its dependencies (e.g., `package.json` or better yet `package-lock.json`, `.jar` or `.war` files, `.nuspec`, etc). More information on each type of analyzer can be found here: https://jeremylong.github.io/DependencyCheck/analyzers/index.html

### Dependency License Scan – not implemented

A more conclusive and exhaustive audit of licenses can be produced if a project's dependencies are known. Experiments have been run using `npm` `package-lock.json` and `nuget` `.nuspec` files to retrieve licenses via the package manager's respective APIs. Other projects like Java are less accessible. For instance, a Java project repository, even one containing a `pom.xml` dependency list is of little use without the entire `.jar` or `.war` build artifact.

A decision should be made whether the job of Barista is to ferret out dependencies by way of programmatically determining dependencies (and even be responsible for "building" projects) or if projects should be required to make their build artifacts available (possibly via GitHub Releases).

If Barista enforces that projects include build artifacts then a [Project License Scan](#project-license-scan--implemented-) may be sufficient enough to gather dependency licenses.

Another approach would be to leverage the dependencies discovered by `depedency-check`, in a sense using its output as input to drive license lookup. But again, the utility of `dependency-check` is greatly enhanced when scanning a build artifact that includes all dependencies (like the `./node_modules` directory that is usually not included in source control).

## Process

Currently, the scanning process is simple and straightforward:

1. Loops through all Projects
1. Downloads the project archive (zipball) from GitHub
1. Extracts the archive
1. Executes the **Project License Scan** using the `nomossa.py` wrapper that formats the JSON for consistency.
1. Creates meta JSON results including scan vendor, tool, and timings
1. Persists the raw results and meta results using the Scan model
1. Executes the **Dependency Vulnerability Scan** using `dependency-check` tool
1. Creates meta JSON results including scan vendor, tool, and timings
1. Persists the raw results and meta results using the Scan model
1. Rinse and repeat
