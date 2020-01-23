# API Architecture
* This document discusses major components of the API architecture.
* In many cases the components in this document correspond to folders in the `barista-api/` project.
## Models
* These are TypeORM entity classes, and represent tables in a database.
* These classes should content no logic, only properties.
* See: [NestJS Database](https://docs.nestjs.com/techniques/database)
* See: [TypeORM](https://docs.nestjs.com/recipes/sql-typeorm)
### DTOs
* Data Transfer Objects
* Model objects in the system that are not stored in the database.
## Services
* Aplication service instances that correspond to model objects.
* Model object logic should be places in these classes.
* See: [NestJS Providers](https://docs.nestjs.com/providers)
## Controllers
* Web service controllers corresponding to model objects.
* Each controller is injected with one or more services.
* See: [NestJS Controllers](https://docs.nestjs.com/controllers)
* See: [CRUD for NestJS](https://docs.nestjs.com/recipes/crud)
## Db
* Contains database related items.
### Migrations
* Migration files that support the creation and evolution of the database schema.
* See: [TypeORMMigrations](https://typeorm.io/#/migrations)
### Seeds
* These are database seeds that are required for the application to run.
* See: [TypeORM Database Seeds](https://medium.com/@bansalsushil_34403/how-to-seed-typeorm-d9637a5948cc)
### Demo-Seeds
* These are database seeds that are provided for non-production convenience only.
* These seeds are not required to run the application and should not be executed in production.
## Info
* Classes in this directory are oftern written to with an external process, such as during deployment a `git commit hash` might be written to a token in the file so that it can show up in the application.
## Shared
* Share items such as utilities or generic logic that might be used in any part of the application.