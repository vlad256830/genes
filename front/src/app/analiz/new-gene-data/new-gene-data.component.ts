import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-new-gene-data',
  templateUrl: './new-gene-data.component.html',
  styleUrls: ['./new-gene-data.component.css']
})
export class NewGeneDataComponent implements OnInit {

  title = 'Add new Gene Data';

  datafile: File;

  constructor(public dialogRef: MatDialogRef<NewGeneDataComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FormData) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onGetData() {
    this.data = new FormData();
    // console.log(this.datafile);
    this.data.append('genedatafile', this.datafile);
    this.dialogRef.close({ data: this.data });
  }

  onChangeDataFileName(files) {
    this.datafile = files[0];
    // console.log(this.datafile);
  }


}
