import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@app/features/auth/auth.service';
import { ProjectService } from '@app/shared/+state/project/project.service';
import { ScanService } from '@app/shared/+state/scan/scan.service';
import { ScanApiService } from '@app/shared/api';
import { ComponentWithMessage } from '@app/shared/app-components/ComponentWithMessage';
import IDataTableColumns from '@app/shared/interfaces/IDataTableColumns';
import { Observable, Subject } from 'rxjs';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-project-scans',
  templateUrl: './project-scans.component.html',
  styleUrls: ['./project-scans.component.scss'],
})
export class ProjectScansComponent extends ComponentWithMessage implements OnInit, OnDestroy {
  constructor(
    private authService: AuthService,
    private projectService: ProjectService,
    private scanApiService: ScanApiService,
    private scanService: ScanService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    super();
  }

  columns: IDataTableColumns[];
  currentPagedData: any = {
    count: 0,
    data: [],
    page: 0,
    pageCount: 0,
    total: 0,
  };
  currentQuery: any;
  @ViewChild('dateCellTmpl', { static: true }) dateCellTmpl;

  pageResults$ = new Subject<any[]>();
  projectId: number;
  @ViewChild('scanProgressTmpl', { static: true }) scanProgressTmpl;
  selected = [];

  showScanButton = false;

  getPagedResults(query: any): void {
    this.currentQuery = query;

    query.filter = `project.id||eq||${this.projectId}`;
    this.scanApiService
      .scanGet(
        query.fields,
        query.filter,
        query.or,
        query.sort,
        query.join,
        query.perPage,
        query.offset,
        query.page,
        query.cache,
      )
      .subscribe(results => {
        this.currentPagedData = results || { count: 0, data: [], page: 1, total: 0 };
        this.pageResults$.next(this.currentPagedData);
      });
  }

  getPageResults(query: any): Observable<any> {
    this.getPagedResults(query);

    return this.pageResults$;
  }

  ngOnDestroy(): void {}

  ngOnInit() {
    this.projectId = Number(this.route.snapshot.paramMap.get('projectId'));

    this.columns = [
      { name: 'Scan Id', prop: 'id', flexGrow: 1, cellTemplate: this.scanProgressTmpl },
      {
        name: 'Date',
        prop: 'createdAt',
        cellTemplate: this.dateCellTmpl,
        flexGrow: 1,
      },
    ];

    this.projectService
      .getByKey(this.projectId)
      .pipe(first())
      .subscribe(project => {
        this.showScanButton = this.authService.isProjectOwner(project);
      });
  }

  onSelect({ selected }) {
    return this.router.navigate(['scan', selected[0].id], {
      relativeTo: this.route,
    });
  }

  scan() {
    this.projectId = Number(this.route.snapshot.paramMap.get('projectId'));

    this.scanService.apiService
      .scanProjectIdPost(this.projectId)
      .pipe(first())
      .subscribe(
        result => {
          this.trackScanStatus(result.id);

          this.trackScan(result.id, 0);

          this.showMessage('Scan successfully started.');
        },
        response => {
          this.showMessage(response.error.error);
        },
      );
  }

  trackScan(scanId: number, progress: number) {
    const { data } = this.currentPagedData;
    data.unshift({ id: scanId, createdAt: '', isScanning: true, progress });

    this.currentPagedData.data = [...data];

    // Because we're manually pushing in an element above,
    // we need to tell the grid there's an extra row.
    this.currentPagedData.count++;
    this.currentPagedData.total++;

    this.pageResults$.next(this.currentPagedData);
  }

  trackScanStatus(scanId: number) {
    this.scanService.apiService.scanIdGet(scanId).subscribe(scanDetail => {
      if (!scanDetail.completedAt) {
        const API_RATE_LIMIT = 1000;

        // TODO - Update API to increment the progress value to use in the UI to show an exact % to the user

        setTimeout(() => {
          this.trackScanStatus(scanId);
        }, API_RATE_LIMIT);
      } else {
        this.getPagedResults(this.currentQuery);
      }
    });
  }
}
