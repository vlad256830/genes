import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { MatSort, MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';

import { DataService } from '../data.service';
import { AuthService } from '../auth/auth.service';
import { ErrorsService } from '../errors.service';
import { Group, Risk } from '../genes.interface';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {

  dataSource = new MatTableDataSource();
  displayedColumns = ['index', 'group_id', 'rsid', 'risk', ];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  selectedRisk: Risk = {
    'id': -1,
    'rsid': '',
    'risk': '',
    'group_id': -1
  };

  arrayGroups: Group[] = [];
  selectedRowIndex = -1;

  selectedGroup = '';

  constructor(private dataService: DataService,
    private authService: AuthService,
    private errorsService: ErrorsService) { }

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.onGetGroups();
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
    this.dataService.getGroupRiskRSID(this.selectedGroup)
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
  }

}
