import { Injector, NgModule } from '@angular/core';

export let AppInjector: Injector;

@NgModule()
export class GlobalInjectorModule {
  constructor(private injector: Injector) {
    AppInjector = this.injector;
  }
}
