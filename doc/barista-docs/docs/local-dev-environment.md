---
id: local-dev-environment
title: Development Environment Setup
sidebar_label: Development Environment Setup
---

Follow these steps on your Macintosh to load a development instance of the system:

1. Install [Docker Desktop](https://www.docker.com/products/docker-desktop)
1. Install [Brew](https://brew.sh/)
1. Install [NVM](https://github.com/nvm-sh/nvm) using `brew install nvm` and don't forget to update your `.bash_profile`
1. Install [Node 10.x LTS](https://nodejs.org) using NVM: `nvm install v10.16.0` and ensure that it is the version in use by checking ith the `node -v` command.
1. Install the [Yarn](https://yarnpkg.com/) dependency manager using the `npm i -g yarn` command.
1. Clone the [repository](https://github.com/Optum/barista.git)
1. From within each application subdirectory (`barista-api`, `barista-scan`, `barista-web`) load dependencies using the `yarn install` command.
1. In a console window from the root of the `barista-api/` folder type `yarn compose:dev up` (Make sure that the Docker daemon is started)
1. From within the `barista-api` directory issue the `yarn db:reset` command to configure the database.
1. From within each application subdirectory (`barista-api`, `barista-scan`, `barista-web`) in separate console windows start each application tier using the `yarn start:dev` command.
1. Once the application is started the following instances should be available from your localhost:
    * [Barista Web](http://localhost:4200): The system's main web user UI.
    * [Barista Api](http://localhost:3000/api/v1/api-docs): The REST interface Swagger documentation.
    * Barista Scan (No interface), pulls it's work from the [Bull](https://github.com/fwoelffel/nest-bull)/[Redis](https://redis.io/) work queue.
    * [PostgreSQL](https://www.postgresql.org/) Development database running at: `postgresql://postgres:password@db:5432/barista-dev`
    * [PostgreSQL](https://www.postgresql.org/) Test database running at: `postgresql://postgres:password@db:5433/barista-test`. The test database is used by the end-to-end (e2e) tests.
    * The following tools are provided as a convenience for development and are not required to run the system:
      * [PostgresAdmin](http://localhost:8081/): A web based administrative tool for the Postgres database [postgres@admin.com:password].
      * [Arena Queue UI](http://localhost:3000/arena): An interactive dashboard for the Bull queue product. See: https://github.com/bee-queue/arena
      * [Redis Commander](http://localhost:8082/): A GUI Redis interface.
      * [Dozzle](http://localhost:8080/): A GUI to examine the log output from the various services. See: https://dozzle.dev/

## Notes
* The `barista-api/docker/*.yml` [Docker Compose](https://docs.docker.com/compose/overview/) configuration files provide useful information about the configuration of the dev environment including login credentials for configured services.
* To stop the back end services you can issues the command: `yarn compose:dev down`

### Dependencies
In order to execute project scans, the following software packages must be installed:

* OpenJDK 8 (OWASP Dependency Check)
  * `brew tap adoptopenjdk/openjdk`
  * `brew cask install adoptopenjdk8`
* Maven (Java project dependencies and licenses)
  * `brew install maven`
* Nuget (.NET project dependencies and licenses)
  * `brew install nuget`
