

## Description

Barista license and vulnerability scanning tool Scan Module

## Installation

```bash
$ yarn install
```

## Database
When loading the database for the first time in a non-development environment it will be required to migrate/seed the database.

```bash
# migrate (not necessary in development)
$ yarn db:migrate

# seed
$ yarn db:seed

# drop, recreate, seed (not in production!)
$ yarn db:reset
```

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```

# Documentation

[Third Party Tools](./docs/third-party-tools.md)

[System Architecture](./docs/system-architecture.md)  

[Local Development Environment](./docs/local-dev-environment.md)  

[Developer Tools](./docs/developer-tools.md)

[License Scanners](./docs/license-scanners.md)

[Common Errors](./docs/common-errors.md)

## Support

  TBD

## Stay in touch

  TBD

## License

  TBD
