import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'app-load-group',
  templateUrl: './load-group.component.html',
  styleUrls: ['./load-group.component.css']
})
export class LoadGroupComponent implements OnInit {

  title = 'Add new risk Group';

  datafile: File;

  constructor(public dialogRef: MatDialogRef<LoadGroupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FormData) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onGetData() {
    this.data = new FormData();
    // console.log(this.datafile);
    this.data.append('datafile', this.datafile);
    this.dialogRef.close({ data: this.data });
  }

  onChangeDataFileName(files) {
    this.datafile = files[0];
    // console.log(this.datafile);
  }

}
