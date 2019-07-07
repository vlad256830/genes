import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSort, MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';

import { DataService } from '../data.service';
import { AuthService } from '../auth/auth.service';
import { ErrorsService } from '../errors.service';
import { Group, RiskGroups, CreateRisk } from '../genes.interface';
import { EditGroupComponent } from './edit-group/edit-group.component';
import { AddGroupComponent } from './add-group/add-group.component';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { LoadGroupComponent } from './load-group/load-group.component';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {

  dataSource = new MatTableDataSource();
  displayedColumns = ['index', 'group_id', 'gene_name', 'rsid', 'risk', ];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  selectedRisk: RiskGroups = {
    'id': -1,
    'rsid': '',
    'risk': '',
    'gene_name': '',
    'group_id': -1
  };

  arrayGroups: Group[] = [];
  selectedRowIndex = -1;

  selectedGroup = -1;

  constructor(private dataService: DataService,
    private authService: AuthService,
    private errorsService: ErrorsService,
    private formBuilder: FormBuilder,
    public editRisk: MatDialog,
    public addGroup: MatDialog,
    public confDialog: MatDialog,
    public loadGroup: MatDialog) { }

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.onGetGroups();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onGetGroups() {
    this.arrayGroups = [];
    this.dataService.getGroups()
      .subscribe(data => {
        // console.log(data.results);
        data.results.forEach(element => {
          const newrow: Group = {
            'id': element.id,
            'group': element.group
          };
          this.arrayGroups.push(newrow);
        });
      },
        err => {
          const errors = err['error'];
          console.log(errors);
          this.errorsService.openSnackBar('Error data.');
        });
  }

  onCloseSelectGroup(event) {
    // console.log(this.selectedGroup);
   this.showRiskGroup(this.selectedGroup);
  }

  showRiskGroup(group) {
    this.dataService.getGroupRiskRSID(group)
    .subscribe(data => {
        // console.log(data);
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.filter = '';
      },
        err => {
          const errors = err['error'];
          console.log(errors);
          this.errorsService.openSnackBar('Error data.');
        });
  }

  onGetRisk(row) {
    this.selectedRowIndex = row.id;
    this.selectedRisk.id = row.id;
    this.selectedRisk.group_id = row.group_id;
    this.selectedRisk.risk = row.risk;
    this.selectedRisk.rsid = row.rsid;
    this.selectedRisk.gene_name = row.gene_name;
  }

  onAddRiskRsid() {
    if (this.selectedGroup !== -1) {
      const dialogRef = this.editRisk.open(EditGroupComponent, {
        width: '650px',
        data: {
          rsid: '',
          gene_name: '',
          risk: '',
          group_id: this.selectedGroup,
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        // console.log(result);
        if ((result !== undefined) && (result.data.rsid !== '') && (result.data.risk !== '')) {
          const newRisk: CreateRisk = {
            rsid: result.data.rsid,
            gene_name: result.data.gene_name,
            risk: result.data.risk,
            group_id: this.selectedGroup
          };
          this.dataService.addRisk(newRisk)
            .subscribe(data => {
              this.showRiskGroup(this.selectedGroup);
            },
              err => {
                const errors = err['error'];
                console.log(errors);
                if (errors.gene_name) {
                  this.errorsService.openSnackBar(errors.gene_name[0]);
                } else {
                  this.errorsService.openSnackBar('Error data.');
                }
              });
        }
      });
    }
  }

  onEditRiskRsid() {
    if (this.selectedRisk.id !== -1) {
      const dialogRef = this.editRisk.open(EditGroupComponent, {
        width: '650px',
        data: {
          rsid: this.selectedRisk.rsid,
          risk: this.selectedRisk.risk,
          group_id: this.selectedRisk.group_id,
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        // console.log(result);
        if ((result !== undefined) && (result.data.rsid !== '') && (result.data.risk !== '')) {
          const newRisk: RiskGroups = {
            id: this.selectedRisk.id,
            rsid: result.data.rsid,
            gene_name: result.data.gene_name,
            risk: result.data.risk,
            group_id: result.data.group_id
          };
          this.dataService.updateRisk(newRisk)
            .subscribe(data => {
              this.showRiskGroup(this.selectedGroup);
            },
              err => {
                const errors = err['error'];
                console.log(errors);
                if (errors.gene_name) {
                  this.errorsService.openSnackBar(errors.gene_name[0]);
                } else {
                  this.errorsService.openSnackBar('Error data.');
                }
              });
        }
      });
    }
  }

  onAddGroup() {
    console.log('add group');
      const dialogRef = this.addGroup.open(AddGroupComponent, {
        width: '365px',
        data: {
          group: '',
          group_id: -1,
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        // console.log(result);
        if ((result !== undefined) && (result.data.group !== '')) {
          const group = result.data.group;
          this.dataService.addRiskGroup({'group': group})
            .subscribe(data => {
              this.onGetGroups();
            },
              err => {
                const errors = err['error'];
                console.log(errors);
                if (errors.gene_name) {
                  this.errorsService.openSnackBar(errors.gene_name[0]);
                } else {
                  this.errorsService.openSnackBar('Error data.');
                }
              });
        }
      });
  }

  onDeleteGroup() {
    if (this.selectedGroup !== -1) {
      const id = this.selectedGroup;
      const dialogRef = this.confDialog.open(ConfirmationDialogComponent);
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.dataService.deleteRiskGroup(id)
            .subscribe(data => {
              this.onGetGroups();
              this.dataSource.data = [];
            },
              err => {
                const errors = err['error'];
                console.log(errors);
                this.errorsService.openSnackBar('Error delete file.');
              });
        }
      });
    }
  }

  onLoadGroupFromFile() {
      const dialogRef = this.loadGroup.open(LoadGroupComponent);
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.dataService.uploadCSVRiskGroup(result.data)
            .subscribe(data => {
              // console.log('fname', data);
              this.dataService.appendFileCSVRiskGroup(data.id)
              .subscribe(res => {
                // console.log(res);
                this.onGetGroups();
              },
              error => {
                const errors = error['error'];
                console.log(errors);
                this.errorsService.openSnackBar(errors);
              });
            },
              err => {
                const errors = err['error'];
                console.log(errors);
                this.errorsService.openSnackBar(errors);
              });
        }
      });
  }

}
