# Common Errors

* While running seed migrations you receive this error:  `Error: Entity metadata for YourType#yourproperty was not found. Check if you specified a correct entity object and if it's connected in the connection options.`
  * Solution: Check type import statements and make sure that they are not aliased. e.g. `@app/models/Project` will fail while `../../models/Project` works fine.