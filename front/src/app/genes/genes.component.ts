import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { MatSort, MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';

import { DataService } from '../data.service';
import { AuthService } from '../auth/auth.service';
import { ErrorsService } from '../errors.service';
import { AddGeneComponent } from './add-gene/add-gene.component';
import { AddRsidComponent } from './add-rsid/add-rsid.component';
import { Genes, Gene, NewRsid } from '../genes.interface';


@Component({
  selector: 'app-genes',
  templateUrl: './genes.component.html',
  styleUrls: ['./genes.component.css']
})
export class GenesComponent implements OnInit {

  dataSource = new MatTableDataSource();
  displayedColumns = ['index', 'gene_name', 'category', 'urls'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  selectedGene: Genes = {
    'id': -1,
    'gene_name': '',
    'category': '',
    'urls': '',
    'comments': '',
    'description': '',
    'rsids': []
  };

  selectedRowIndex = -1;

  constructor(private dataService: DataService,
    private authService: AuthService,
    private errorsService: ErrorsService,
    public addGene: MatDialog,
    public addRsid: MatDialog) { }

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.onGetGenes();
  }

  isAuth(): boolean {
    return (this.authService.isAuthenticated() && this.authService.isLoggedIn()) ;
  }

  onGetGenes() {
    this.dataService.getGenes()
      .subscribe(data => {
        // console.log(data.results);
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

  onGetGene(row) {
    // console.log(row.genes);
    this.selectedRowIndex = row.id;
    this.selectedGene.id = row.id;
    this.selectedGene.gene_name = row.gene_name;
    this.selectedGene.category = row.category;
    this.selectedGene.urls = row.urls;
    this.selectedGene.comments = row.comments;
    this.selectedGene.description = row.description;
    this.selectedGene.rsids = row.genes;
  }

  onAddGene() {
    const dialogRef = this.addGene.open(AddGeneComponent, {
      width: '650px',
      data: { gene_name: '', category: '', urls: '', comments: '', description: '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log(result);
      if ((result !== undefined) && (result.data.gene_name !== '') && (result.data.category !== '')) {
        const gene_name = result.data.gene_name;
        const category = result.data.category;
        const urls = result.data.urls;
        const comments = result.data.comments;
        const description = result.data.description;
        this.dataService.addGene(gene_name, category, urls, comments, description)
          .subscribe(data => {
            this.onGetGenes();
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

  onEditGene() {
    if (this.selectedGene.id !== -1) {
      const id = this.selectedGene.id;
      const dialogRef = this.addGene.open(AddGeneComponent, {
        width: '650px',
        data: {
          gene_name: this.selectedGene.gene_name,
          category: this.selectedGene.category,
          urls: this.selectedGene.urls,
          comments: this.selectedGene.comments,
          description: this.selectedGene.description
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        // console.log(result);
        if ((result !== undefined) && (result.data.gene_name !== '') && (result.data.category !== '')) {
          const gene_name = result.data.gene_name;
          const category = result.data.category;
          const urls = result.data.urls;
          const comments = result.data.comments;
          const description = result.data.description;
          this.dataService.updateGene(gene_name, category, urls, comments, description, id)
            .subscribe(data => {
              this.onGetGenes();
              const genes: Gene = {
                id: this.selectedGene.id,
                gene_name: gene_name,
                category: category,
                urls: urls,
                comments: comments,
                description: description
              };
              this.onGetGene(genes);
            },
              err => {
                const errors = err['error'];
                console.log(errors);
                this.errorsService.openSnackBar('Error data.');
              });
        }
      });
    }
  }

  onAddRSIDGene() {
    if (this.selectedGene.id !== -1) {
      const dialogRef = this.addRsid.open(AddRsidComponent, {
        width: '650px',
        data: {}
      });

      dialogRef.afterClosed().subscribe(result => {
        // console.log(result);
        if ((result !== undefined) && (result.data.rsid !== '') && (result.data.category !== '')) {
          const newRsid: NewRsid = {
            gene_id: this.selectedGene.id,
            rsid: result.data.rsid,
            category: result.data.category,
            links: result.data.links,
            minor_allele: result.data.minor_allele,
            major_allele: result.data.major_allele,
            risk_allele: result.data.risk_allele,
            txt_major: result.data.txt_major,
            txt_minor: result.data.txt_minor
          };
          this.dataService.addRsid(newRsid)
            .subscribe(data => {
              this.onGetGenes();
              this.selectedGene.rsids.push(newRsid.rsid);
            },
              err => {
                const errors = err['error'];
                console.log(errors);
                if (errors.rsid) {
                  this.errorsService.openSnackBar(errors.rsid[0]);
                } else {
                  this.errorsService.openSnackBar('Error data.');
                }
              });
        }
      });
    }
  }


}
