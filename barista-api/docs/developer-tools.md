# Developer Tools

## Quality Tools

TSLint

Prettier

### Tests 

#### Jest Unit

#### e2e Tests

* Testing Database
  * When running e2e tests be sure to set the `TEST_DB=true` environment variable so that the e2e tests run against the test database.
  * For convenience this variable is set in the `test:e2e` package.json script.
* Cleaning Up
  * Be sure to clean up the database `afterEach()` e2e test like this:
  ```
    afterEach(async () => {
      await scanService.db.delete({});
      await projectService.db.delete({});
      return app.close();
    });
  ```

faker

factory-girl

## Documentation

Compodoc

Had Documentation