import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Project } from '@app/shared/api';
import { BomGlobalFilterMessageService } from '@app/shared/services/BomGlobalFilterMessageService';
import * as _ from 'lodash';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-bill-of-materials',
  templateUrl: './bill-of-materials.component.html',
  styleUrls: ['./bill-of-materials.component.scss'],
})
export class BillOfMaterialsComponent implements OnInit, AfterViewInit, OnDestroy {
  constructor(private bomGlobalFilterMessageService: BomGlobalFilterMessageService) {}

  filter = '';

  hasNoScans: boolean;

  @Input() project: Project;

  @ViewChild('searchInput') searchInput: ElementRef;

  clearSearchField() {
    this.filter = '';
    this.bomGlobalFilterMessageService.send('');
  }

  ngAfterViewInit(): void {
    if (!this.searchInput) {
      return;
    }

    fromEvent(this.searchInput.nativeElement, 'input')
      .pipe(
        map((event: any) => event.target.value),
        filter(res => res.length > 2 || res.length === 0),
        debounceTime(500),
        distinctUntilChanged(),
        untilDestroyed(this),
      )
      .subscribe((text: string) => {
        this.bomGlobalFilterMessageService.send(text);
      });
  }

  ngOnDestroy(): void {}

  ngOnInit() {
    if (this.project && this.project.wasImported) {
      this.hasNoScans = false;
    } else {
      this.hasNoScans = !this.project || _.isEmpty(this.project.scans);
    }
  }
}
