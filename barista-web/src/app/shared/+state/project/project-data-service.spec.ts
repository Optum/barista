import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { async, TestBed } from '@angular/core/testing';
import { entityConfig } from '@app/shared/+state/entity-metadata';
import { EntityStoreModule } from '@app/shared/+state/entity-store.module';
import { ProjectDataService } from '@app/shared/+state/project/project-data-service';
import { ProjectService } from '@app/shared/+state/project/project.service';
import { ApiModule, Project, ProjectApiService } from '@app/shared/api';
import { DefaultHttpUrlGenerator, DefaultLogger, EntityDataModule, HttpUrlGenerator, Logger } from '@ngrx/data';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { take } from 'rxjs/operators';

describe('Project Data Service', () => {
  let collectionService: ProjectService;
  let dataService: ProjectDataService;
  let backend: HttpTestingController;
  let service: ProjectApiService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        EntityDataModule.forRoot(entityConfig),
        EntityStoreModule,
        ApiModule,
      ],
      providers: [
        Store,
        {
          provide: HttpUrlGenerator,
          useClass: DefaultHttpUrlGenerator,
        },
        {
          provide: Logger,
          useClass: DefaultLogger,
        },
        ProjectDataService,
        ProjectService,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    collectionService = TestBed.get(ProjectService);
    dataService = TestBed.get(ProjectDataService);
    service = TestBed.get(ProjectApiService);
    backend = TestBed.get(HttpTestingController);
  });

  it('should create', () => {
    expect(dataService).toBeTruthy();
  });

  it('should create an entity', done => {
    const expected = {
      id: 1,
      name: 'Test Project',
    } as Project;

    const project = { name: expected.name } as Project;
    dataService
      .add(project)
      .pipe(take(1))
      .subscribe(actual => {
        expect(actual).toEqual(expected);
        done();
      });

    const requestWrapper = backend.expectOne(`${service.configuration.basePath}/project`);
    requestWrapper.flush(expected);
  });

  it('should retrieve a created entity', done => {
    const expected = {
      id: 1,
      name: 'Test Project',
    } as Project;

    const project = { name: expected.name } as Project;

    collectionService
      .add(project)
      .pipe(take(1))
      .subscribe(result => {
        expect(result).toEqual(expected);
      });

    const subscription = collectionService.entities$.pipe().subscribe(actual => {
      if (actual.length > 0) {
        expect(actual[0]).toEqual(expected);
        subscription.unsubscribe();
        done();
      }
    });

    const requestWrapper = backend.expectOne(`${service.configuration.basePath}/project`);
    requestWrapper.flush(expected);
  });
});
