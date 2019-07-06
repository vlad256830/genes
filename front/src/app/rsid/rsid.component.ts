import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { MatSort, MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';

import { DataService } from '../data.service';
import { AuthService } from '../auth/auth.service';
import { ErrorsService } from '../errors.service';
import { EditRsidComponent } from './edit-rsid/edit-rsid.component';
import { Rsid } from '../genes.interface';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-rsid',
  templateUrl: './rsid.component.html',
  styleUrls: ['./rsid.component.css']
})
export class RsidComponent implements OnInit {

  dataSource = new MatTableDataSource();
  displayedColumns = ['index', 'gene_name', 'rsid', 'category', 'minor_allele', 'major_allele',
    'risk_allele', 'gene_id',];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  selectedRsid: Rsid = {
    'id': -1,
    'gene_name': '',
    'rsid': '',
    'category': '',
    'minor_allele': '',
    'major_allele': '',
    'risk_allele': '',
    'links': '',
    'txt_minor': '',
    'txt_major': '',
    'gene_id': -1
  };

  selectedRowIndex = -1;

  constructor(private dataService: DataService,
    private authService: AuthService,
    private errorsService: ErrorsService,
    public editRsid: MatDialog,
    public confdialog: MatDialog) { }

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.onGetRsids();
  }

  isAuth(): boolean {
    return (this.authService.isAuthenticated() && this.authService.isLoggedIn()) ;
  }

  onGetRsids() {
    this.dataService.getGetRsid()
      .subscribe(data => {
        // console.log(data);
        this.dataSource.data = data.results;
        this.dataSource.paginator = this.paginator;
        this.dataSource.filter = '';
      },
        err => {
          const errors = err['error'];
          console.log(errors);
          this.errorsService.openSnackBar('Error data.');
        });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onGetRsid(row: Rsid) {
    // console.log(row);
    this.selectedRowIndex = row.id;
    this.selectedRsid.id = row.id;
    this.selectedRsid.gene_name = row.gene_name;
    this.selectedRsid.rsid = row.rsid;
    this.selectedRsid.category = row.category;
    this.selectedRsid.links = row.links;
    this.selectedRsid.minor_allele = row.minor_allele;
    this.selectedRsid.major_allele = row.major_allele;
    this.selectedRsid.risk_allele = row.risk_allele;
    this.selectedRsid.txt_major = row.txt_major;
    this.selectedRsid.txt_minor = row.txt_minor;
    this.selectedRsid.gene_id = row.gene_id;
  }


  onEditRsid() {
    if (this.selectedRsid.id !== -1) {
      const id = this.selectedRsid.id;
      const dialogRef = this.editRsid.open(EditRsidComponent, {
        width: '650px',
        data: {
          rsid: this.selectedRsid.rsid,
          category: this.selectedRsid.category,
          links: this.selectedRsid.links,
          minor_allele: this.selectedRsid.minor_allele,
          major_allele: this.selectedRsid.major_allele,
          risk_allele: this.selectedRsid.risk_allele,
          txt_major: this.selectedRsid.txt_major,
          txt_minor: this.selectedRsid.txt_minor,
          gene_id: this.selectedRsid.gene_id
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        // console.log(result);
        if ((result !== undefined) && (result.data.rsid !== '') && (result.data.category !== '')) {
          const newRsid: Rsid = {
            id: this.selectedRsid.id,
            rsid: result.data.rsid,
            category: result.data.category,
            links: result.data.links,
            minor_allele: result.data.minor_allele,
            major_allele: result.data.major_allele,
            risk_allele: result.data.risk_allele,
            txt_major: result.data.txt_major,
            txt_minor: result.data.txt_minor,
            gene_name: this.selectedRsid.gene_name,
            gene_id: result.data.gene_id
          };
          this.dataService.updateRsid(newRsid)
            .subscribe(data => {
              this.onGetRsids();
              this.selectedRsid = newRsid;
            },
              err => {
                const errors = err['error'];
                console.log(errors);
                this.errorsService.openSnackBar('Помилка під час отримання інформації з бази даних.');
              });
        }
      });
    }
  }

  onDeleteRsid() {
    if (this.selectedRsid.id !== -1) {
      const id = this.selectedRsid.id;
      const dialogRef = this.confdialog.open(ConfirmationDialogComponent);
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.dataService.deleteRsid(id)
            .subscribe(data => {
              this.onGetRsids();
            },
              err => {
                const errors = err['error'];
                console.log(errors);
                this.errorsService.openSnackBar('Помилка під час отримання інформації з бази даних.');
              });
        }
      });
    }
  }

}
