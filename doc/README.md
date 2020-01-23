# Docs for Development

## Quick Links

- [Jenkins][JenkinsURL]
- [OpenShift][OpenShiftURL]
- **`dev`** environment https://baristadev.optum.com/
- **`prod`** environment https://barista.optum.com/

## Getting Started

- [Overview of the Barista Workflow](workflow.md)
- [Development Environment Setup](local-dev-environment.md)

## General Documentation

- [System Architecture](system-architecture.md)

## How we develop

We prefer the simplest possible Project view within our GitHub repo https://github.com/Optum/barista/projects with **To do**, **In progress**, **Done** columns.

We prefer the simplest possible source code strategy (ie, [GitHub Flow](https://guides.github.com/introduction/flow/)) with `master` branch always being green, working in **feature/bug branches** before merging into `master`, testing locally before deploying globally (and testing again). See further documentation in our [`CONTRIBUTING` guidelines](../CONTRIBUTING.md#how-to-contribute).

## How we deploy

We use [Jenkins for CI/CD][JenkinsURL] and target the [OpenShift platform for deployments][OpenShiftURL].

Our goal is to have a **`dev`** environment and **`prod`** environment. **`dev`** will be used to vet a changeset with a _production-like_ dataset. Once the changeset is verified in **`dev`**, we [cut a release](https://github.com/Optum/barista/releases) for a deploy to **`prod`**.

See additional [deployment documentation](https://github.com/Optum/barista/blob/master/doc/deployments.md).

[JenkinsURL]: https://jenkins-barista-development.ocp-ctc-core-nonprod.optum.com
[OpenShiftURL]: https://ocp-ctc-core-nonprod.optum.com/console/project/barista-development/overview
