import { Injectable, OnDestroy } from '@angular/core';
import { ToolTip, ToolTipApiService } from '@app/shared/api';
import { ToolTipsDataChangedMessageService } from '@app/shared/services/ToolTipsDataChangedMessageService';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ToolTipsCacheService implements OnDestroy {
  private cache = {};

  constructor(
    private toolTipApiService: ToolTipApiService,
    private toolTipsDataChangedMessageService: ToolTipsDataChangedMessageService,
  ) {
    this.toolTipsDataChangedMessageService
      .get()
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.cache = {}; // reset cache
      });
  }

  public getToolTipsForPage(pageName: string): Observable<Array<ToolTip>> {
    const cached = this.cache[pageName];
    if (cached) {
      return of(cached);
    }

    return this.toolTipApiService.tooltipGet(null, `pageName||eq||${pageName}`).pipe(
      map(data => {
        this.cache[pageName] = {};
        data.forEach(tt => {
          this.cache[pageName][tt.elementName] = tt.content;
        });
        return this.cache[pageName];
      }),
    );
  }

  ngOnDestroy(): void {}
}
