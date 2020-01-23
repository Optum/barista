import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-app-dialog',
  templateUrl: './app-dialog.component.html',
  styleUrls: ['./app-dialog.component.scss'],
})
export class AppDialogComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<AppDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.title = data.title;
    this.message = data.message;
    this.json = data.json;
  }
  json: any;
  message: string;
  title: string;

  ngOnInit() {}

  onOk(): void {
    this.dialogRef.close();
  }
}
