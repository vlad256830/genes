import { Component, OnInit, ViewChild, NgZone, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { CreateRisk } from '../../genes.interface';

import { ErrorsService } from 'src/app/errors.service';

@Component({
  selector: 'app-edit-group',
  templateUrl: './edit-group.component.html',
  styleUrls: ['./edit-group.component.css']
})
export class EditGroupComponent implements OnInit {

  title = 'Add new risk RSID';
  enableId = false;

  constructor(public dialogRef: MatDialogRef<EditGroupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CreateRisk,
    private ngZone: NgZone,
    private errorsService: ErrorsService) { }

  ngOnInit() {
    if (this.data.rsid !== '') {
      this.title = 'Edit risk RSID';
      this.enableId = true;
    } else {
      this.title = 'Add new risk RSID';
      this.enableId = false;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onGetData() {
    if ((this.data.rsid === '') || (this.data.rsid.length < 2) || (this.data.rsid.length > 45)) {
      this.errorsService.openSnackBar('Enter valid gene name.');
      return;
    }
    if ((this.data.risk === '') || (this.data.risk.length > 10)) {
      this.errorsService.openSnackBar('Enter valid Risk Allele field.');
      return;
    }
   
    this.dialogRef.close({data: this.data});

  }


}
