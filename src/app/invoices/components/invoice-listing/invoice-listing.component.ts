import { MatSnackBar, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { InvoiceService } from './../../services/invoice.service';
import { Component, OnInit, ViewChild, AfterViewInit, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { Invoice } from '../../models/invoice';
import { Router } from '@angular/router';
import { remove } from 'lodash';
// tslint:disable-next-line:import-blacklist
import 'rxjs/Rx';
import { of as observableOf } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators/catchError';
import { map } from 'rxjs/operators/map';
import { startWith } from 'rxjs/operators/startWith';
import { switchMap } from 'rxjs/operators/switchMap';
import { merge } from 'rxjs/observable/merge';

@Component({
  selector: 'app-invoice-listing',
  templateUrl: './invoice-listing.component.html',
  styleUrls: ['./invoice-listing.component.scss']
})
export class InvoiceListingComponent implements OnInit, AfterViewInit, AfterViewChecked {

  constructor( private invoiceService: InvoiceService, private router: Router,
    private snackBar: MatSnackBar, private ref: ChangeDetectorRef) { }

  displayedColumns = ['item', 'date', 'due', 'qty', 'rate', 'tax', 'action'];
  dataSource = new MatTableDataSource<Invoice>();
  // dataSource: Invoice[] = [];
  resultsLength = 0;
  isResultsLoading = false;
@ViewChild(MatPaginator) paginator: MatPaginator;  // needed to access the DOM veribles
@ViewChild(MatSort) sort: MatSort;
saveBtnHandler() {
    this.router.navigate(['dashboard', 'invoices', 'new']);  // router dependency injection
  }
  deleteBtnHandler(id) {
    // this.invoiceService.deleteInvoice(id)
    //   .subscribe(data => {                           // lodash function https://lodash.com/docs/4.17.11#remove
    //     const removedItems = remove(this.dataSource, (item) => item._id === data._id );  // arrow function
    //     this.dataSource = [...this.dataSource];    // automatically updated
    //     this.snackBar.open('Invoice deleted', 'Success', {
    //       duration: 2000,
    //     });
    //   }, err => this.errorHandler(err, 'Could not delete')
    //   );
    this.invoiceService.deleteInvoice(id)
       .subscribe(data => {
       const removedItems = remove(this.dataSource.data, (item) => item._id === data._id );
       this.dataSource.data = [...this.dataSource.data];
       this.snackBar.open('Invoice deleted', 'Success', {
          duration: 2000,
         });
      }, err => this.errorHandler(err, 'Could not delete')
      );
  }
  editBtnHandler(id) {
    this.router.navigate(['dashboard', 'invoices', id]);
  }
  ngOnInit() {
  }
  ngAfterViewChecked() {
    this.ref.detectChanges();
  }
  filterText(filterValue: string) {
    this.isResultsLoading = true;
    filterValue = filterValue.trim();
    this.invoiceService.getInvoices({
      page: this.paginator.pageIndex,
      perPage: this.paginator.pageSize,
      sortField: this.sort.active,
      sortDir: this.sort.direction,
      filter: filterValue
    }).subscribe(data => {
      this.dataSource.data = data.docs;
      this.resultsLength = data.total;
      this.isResultsLoading = false;
    }, err => this.errorHandler(err, 'Failed to filter invoices', ));
  }
  ngAfterViewInit() {
    // this.paginator.page
    //   .flatMap(() => {                // with import rxjs/RX can be used as subscribe
    //     this.isResultsLoading = true;
    //     return this.invoiceService.getInvoices({ page: this.paginator.pageIndex, perPage: this.paginator.pageSize,
    //       sortField: this.sort.active, sortDir: this.sort.direction});
    //   })
    //   .subscribe(data => {
    //       console.log(data);
    //       this.dataSource = data.docs;
    //       this.resultsLength = data.total;
    //       this.isResultsLoading = false;
    //     }, err =>
    //       this.errorHandler(err, 'Could not fetch invoices'));
    //     this.sort.sortChange.flatMap(() => {
    //         this.isResultsLoading = true;
    //         this.paginator.pageIndex = 0;
    //         return this.invoiceService.getInvoices({
    //           page: this.paginator.pageIndex,
    //           perPage: this.paginator.pageSize,
    //           sortField: this.sort.active,
    //           sortDir: this.sort.direction
    //         });
    //       }).subscribe(data => {
    //         console.log(data);
    //         this.dataSource = data.docs;
    //         this.resultsLength = data.total;
    //         this.isResultsLoading = false;
    //       }, err =>
    //         this.errorHandler(err, 'Could not fetch invoices'));
    // this.populateInvoices();
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    merge(this.paginator.page, this.sort.sortChange).pipe(
      startWith({}),
      switchMap(() => {
        this.isResultsLoading = true;
        return this.invoiceService.getInvoices({
            page: this.paginator.pageIndex,
            perPage: this.paginator.pageSize,
            sortField: this.sort.active,
            sortDir: this.sort.direction,
            filter: ''
          });
      }),
      map(data => {
        this.isResultsLoading = false;
        this.resultsLength = data.total;
        return data.docs;
      }),
      catchError(() => {
        this.isResultsLoading = false;
        this.errorHandler('Failed to fetch invoices', 'Error');
        return observableOf([]);
      })
    ).subscribe(data => {
      this.dataSource.data = data;
    });
  }
  // private populateInvoices() {
  //   this.isResultsLoading = true;
  //   this.invoiceService.getInvoices({page: this.paginator.pageIndex,
  //     perPage: this.paginator.pageSize,
  //     sortField: this.sort.active,
  //     sortDir: this.sort.direction
  //   }).subscribe(
  //     data => {
  //       this.dataSource = data.docs;
  //       this.resultsLength = data.total;
  //       this.isResultsLoading = false;
  //       console.log(data);
  //   }, err =>
  //     this.errorHandler(err, 'Could not fetch invoices'),
  //     () => {
  //       this.isResultsLoading = false;
  //   });
  // }
  private errorHandler(error, massage) {
    this.isResultsLoading = false;
    console.log(error);
    this.snackBar.open(massage, 'Error', {
      duration: 2000,
    });
  }
}

