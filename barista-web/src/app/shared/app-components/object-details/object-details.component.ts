import { Component, Input, OnInit } from '@angular/core';
import * as json2html from 'json2html';

@Component({
  selector: 'app-object-details',
  templateUrl: './object-details.component.html',
  styleUrls: ['./object-details.component.scss'],
})
export class ObjectDetailsComponent implements OnInit {
  constructor() {}
  @Input() description;

  html;
  @Input() jsonObject: any;
  @Input() title = 'Item';

  ngOnInit() {
    this.html = json2html.render(this.jsonObject, { plainHtml: true });
  }
}
