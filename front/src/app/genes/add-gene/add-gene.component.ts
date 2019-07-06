import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import { Component, OnInit, ViewChild, NgZone, Inject } from '@angular/core';
import {take} from 'rxjs/operators';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { Genes } from '../../genes.interface';
import { ErrorsService } from 'src/app/errors.service';

@Component({
  selector: 'app-add-gene',
  templateUrl: './add-gene.component.html',
  styleUrls: ['./add-gene.component.css']
})
export class AddGeneComponent implements OnInit {

  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  title = 'Create new gene';

  constructor(public dialogRef: MatDialogRef<AddGeneComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Genes,
    private ngZone: NgZone,
    private errorsService: ErrorsService) { }

  ngOnInit() {
    if (this.data.gene_name !== '') {
      this.title = 'Edit gene ' + this.data.gene_name;
    }
  }

  triggerResize() {
    this.ngZone.onStable.pipe(take(1))
        .subscribe(() => this.autosize.resizeToFitContent(true));
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onGetData() {
    if ((this.data.gene_name === '') || (this.data.gene_name.length < 2) || (this.data.gene_name.length > 45)) {
      this.errorsService.openSnackBar('Enter valid gene name.');
      return;
    }
    if ((this.data.category === '') || (this.data.category.length < 2) || (this.data.category.length > 45)) {
      this.errorsService.openSnackBar('Enter valid category field.');
      return;
    }
    if (this.data.urls.length > 255) {
      this.errorsService.openSnackBar('Enter valid Urls field.');
      return;
    }
    this.dialogRef.close({data: this.data});

  }


}
