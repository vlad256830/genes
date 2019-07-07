import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatSort, MatTableDataSource, MatDialog } from '@angular/material';


import { DataService } from '../data.service';
import { ErrorsService } from '../errors.service';
import { Group } from '../genes.interface';
import { NewGeneDataComponent } from './new-gene-data/new-gene-data.component';


@Component({
  selector: 'app-analiz',
  templateUrl: './analiz.component.html',
  styleUrls: ['./analiz.component.css']
})
export class AnalizComponent implements OnInit, OnDestroy {

  selectedGroup = -1;

  arrayGroups: Group[] = [];

  enableAnaliz = false;
  dataSourceAnaliz = new MatTableDataSource();
  displayedColumnsAnaliz = ['index', 'group', 'gene_name', 'rsid', 'risk', 'res'];
  @ViewChild(MatSort) sort: MatSort;

  task_id = '';
  intervalPost;

  progressMode = 'determinate';
  progressValue = 0;

  constructor(private dataService: DataService,
    private errorsService: ErrorsService,
    public addGeneData: MatDialog,
    public confDialog: MatDialog) { }

  ngOnInit() {
    this.dataSourceAnaliz.sort = this.sort;
    this.onGetGroups();
  }

  ngOnDestroy() {

  }

  applyFilter(filterValue: string) {
    this.dataSourceAnaliz.filter = filterValue.trim().toLowerCase();
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
        this.arrayGroups.push({ 'id': -1, 'group': 'all groups' });
      },
        err => {
          const errors = err['error'];
          console.log(errors);
          this.errorsService.openSnackBar('Error data.');
        });
  }

  onAddGeneData() {
    const dialogRef = this.addGeneData.open(NewGeneDataComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.progressMode = 'indeterminate';
        this.dataService.uploadNewGeneData(result.data)
          .subscribe(data => {
            const id = data.id;
            // console.log('fname', id);
            this.dataService.startAnaliz(id, this.selectedGroup)
              .subscribe(res => {
                // console.log('task_id', res.rezult.task_id);
                this.task_id = res.rezult.task_id;
                this.intervalPost = setInterval(() => {
                  this.onStatusAnaliz();
                }, 2000);
              },
                errr => {
                  const errors = errr['error'];
                  console.log(errors);
                  this.progressMode = 'determinate';
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

  onStatusAnaliz() {
    this.dataService.statusAnaliz(this.task_id)
      .subscribe(status => {
        // console.log(status);
        if (status.state === 'SUCCESS') {
          clearInterval(this.intervalPost);
          this.progressMode = 'determinate';
          this.enableAnaliz = true;
          this.dataSourceAnaliz.data = status.result.data;
        }
      },
        errstatus => {
          const errors = errstatus['error'];
          console.log(errors);
          this.progressMode = 'determinate';
          this.errorsService.openSnackBar(errors);
        });
  }

}
