# Barista Database
* The application uses the Postgres relational database.
* The application uses the TypeORM package to manage the database and provide entities to the application in the form of POTsOs (Plan ole' Typescript Obejcts).
* The application uses migrations to promote database changes from the developer's local environment to other environments and eventually production.

## Database Migration Workflow

* Database changes are generally administrated through the `barista-api` project. Unless otherwise noted all commands are assumed to be run from the `barista-api` project.

1. Ensure that the database is in a "clean" state.
  * To place the database in a "clean" state, run the `yarn db:reset` command.
2. Make the desired changes to the TypeORM entity file under `src/models`.
3. Generate the database migration by executing the command `yarn db:migration:create <EntityName>` where `<EntityName>` is the name of the entity that is being changed.
  * You should see a message like: `Migration /path/to/migration/{TIMESTAMP}-<EntityName>.ts has been generated successfully.`
4. Review the created migration in `src/db/migrations` for accuracy. 
  * The migration should contain ONLY database updates related to the changes made.
  * If the migration includes unrelated database changes, then the database was not in a clean state and/or there were unrelated changes and/or migrations that were not run. See [Common Migration Issues](#common-migration-issues) for resolution steps.

### Common Migration Issues

* If `No database changes were found`: Ensure that the `dist/` folder is up to date. Migrations are actually run from the `dist/` folder so if for some reason the application did not compile, migrations could be missing or outdated. The `yarn db:rest` command should remove and rebuild the `dist/` folder by default.
* If unrelated changes such as other tables being created were included in the newly created migration as a result of `yarn db:migration:create` this is usually caused by one of the following conditions:
  * The database was in an unclean state.
    * Solution: run `yarn db:reset`
  * Previous migrations were not run
    * Solution: run `yarn db:reset`
  * Unrelated changes not incorporated into a migration were made to entity files.
    * Revert the unintended changes to the entity files, then repeat the [Database Migration Workflow](#database-migration-workflow)