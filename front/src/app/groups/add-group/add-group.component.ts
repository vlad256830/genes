import { Component, OnInit, ViewChild, NgZone, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';


import { ErrorsService } from 'src/app/errors.service';
import { Group } from 'src/app/genes.interface';

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.css']
})
export class AddGroupComponent implements OnInit {

  title = 'Add new risk Group';
  enableId = false;

  constructor(public dialogRef: MatDialogRef<AddGroupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Group,
    private ngZone: NgZone,
    private errorsService: ErrorsService) { }

    ngOnInit() {
      if (this.data.group !== '') {
        this.title = 'Edit risk Group';
        this.enableId = true;
      } else {
        this.title = 'Add new risk Group';
        this.enableId = false;
      }
    }
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  
    onGetData() {
      if ((this.data.group === '') || (this.data.group.length < 2) || (this.data.group.length > 45)) {
        this.errorsService.openSnackBar('Enter valid gene name.');
        return;
      }
      this.dialogRef.close({data: this.data});
    }

}
