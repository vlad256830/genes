import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import { Component, OnInit, ViewChild, NgZone, Inject } from '@angular/core';
import {take} from 'rxjs/operators';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {FormControl, Validators} from '@angular/forms';

import { Rsid } from '../../genes.interface';
import { ErrorsService } from 'src/app/errors.service';

@Component({
  selector: 'app-add-rsid',
  templateUrl: './add-rsid.component.html',
  styleUrls: ['./add-rsid.component.css']
})
export class AddRsidComponent implements OnInit {

  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  title = 'Add RSID';

  constructor(public dialogRef: MatDialogRef<AddRsidComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Rsid,
    private ngZone: NgZone,
    private errorsService: ErrorsService) { }

  ngOnInit() {
  }

  triggerResize() {
    this.ngZone.onStable.pipe(take(1))
        .subscribe(() => this.autosize.resizeToFitContent(true));
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onGetData() {
    if ((this.data.gene_name === '') || (this.data.rsid.length < 2) || (this.data.rsid.length > 45)) {
      this.errorsService.openSnackBar('Enter valid RSID.');
      return;
    }
    if ((this.data.category === '') || (this.data.category.length < 2) || (this.data.category.length > 45)) {
      this.errorsService.openSnackBar('Enter valid Category field.');
      return;
    }
    this.dialogRef.close({data: this.data});

  }
}
