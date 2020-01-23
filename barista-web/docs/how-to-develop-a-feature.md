# How To Develop a Web Feature
 
1. Define the model in the API project under `/models`
2. Ensure there is a CRUD controller in the API project defined under `/controllers` and that you can see the OpenAPI documentation at `http://localhost:3000/api`
3. Ensure that a client api service has been created in the Web project under `shared/api`. See `yarn g:api` and [openapi-generator](https://github.com/OpenAPITools/openapi-generator) for more information.
4. Once an API service is created in the Web project, ensure that an Ngrx data service and service have been created at `shared/+state`.
5. In the Web project add an entry for the new model type to the `EntityMetadataMap` in the `entity-metadata.ts` file.
6. Add the new data service to the `EntityStoreModule` and register it in the `entity-store.module.ts` file.
5. Generate a feature component in the Web project at `feature/<your-feature-name>` using the [Angular CLI](https://cli.angular.io/) e.g. `ng g c feature/YourFeatureName --dry-run` 