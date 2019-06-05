import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import { Component, OnInit, ViewChild, NgZone, Inject } from '@angular/core';
import {take} from 'rxjs/operators';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {FormControl, Validators} from '@angular/forms';

import { Rsid } from '../../genes.interface';
import { ErrorsService } from 'src/app/errors.service';

@Component({
  selector: 'app-edit-rsid',
  templateUrl: './edit-rsid.component.html',
  styleUrls: ['./edit-rsid.component.css']
})
export class EditRsidComponent implements OnInit {

  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  title = 'Edit RSID';

  constructor(public dialogRef: MatDialogRef<EditRsidComponent>,
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
    if (this.data.links.length > 255) {
      this.errorsService.openSnackBar('Enter valid Links field.');
      return;
    }
    this.dialogRef.close({data: this.data});
  }

}
