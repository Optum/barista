import { Component, OnInit } from '@angular/core';
import { APP_PRETTY_ENVIRONMENT } from '@app/info/app-environment';
import { APP_PRETTY_VERSION } from '@app/info/app-version';
import { APP_PRETTY_COMMIT_HASH } from '@app/info/commit-hash';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  constructor() {}
  appCommitHash = APP_PRETTY_COMMIT_HASH;
  appEnvironment = APP_PRETTY_ENVIRONMENT;
  appVersion = APP_PRETTY_VERSION;

  ngOnInit() {}
}
