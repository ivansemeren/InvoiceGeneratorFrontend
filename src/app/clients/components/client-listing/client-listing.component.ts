import { FormDialogComponent } from './../form-dialog/form-dialog.component';
import { Client } from './../../models/client';
import { ClientService } from './../../services/client.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatTableDataSource, MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import 'rxjs/add/operator/mergeMap';
import { remove } from 'lodash';

@Component({
  selector: 'app-client-listing',
  templateUrl: './client-listing.component.html',
  styleUrls: ['./client-listing.component.scss']
})
export class ClientListingComponent implements OnInit {
  displayedColumns = ['firstName', 'lastName', 'email', 'action'];
  dataSource = new MatTableDataSource<Client>();

  constructor(private clientService: ClientService,
    public dialog: MatDialog, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.clientService.getClients().subscribe(data => {
      console.log(data);
      this.dataSource.data = data;
    }, err => this.errorHandler(err, 'Ops!, something went wrong'));
  }
  saveBtnHandler() {
  }

  deleteBtnHandler(clientId) {
    this.clientService.deleteClient(clientId)
    .subscribe(data => {
      const removedItems = remove(this.dataSource.data, (item) => item._id === data._id);
      this.dataSource.data = [...this.dataSource.data];
      this.snackBar.open('Client deleted from contacts', 'Success', {
        duration: 2000,
       });
    }, err => this.errorHandler(err, 'Could not delete'));
    console.log(clientId);
  }
  openDialog(clientId: string): void {
    const options = {
      width: '400px',
      height: '300px',
      data: {}
    };
    if (clientId) {
      options.data = { clientId: clientId };
    }
    // tslint:disable-next-line:prefer-const
    let dialogRef = this.dialog.open(FormDialogComponent, options);
    dialogRef.afterClosed()
    .filter(clientParam => typeof clientParam === 'object')
    .flatMap(result => {
      if (clientId) {
        return this.clientService.updateClient(clientId, result);
      } else {
      return this.clientService.createClient(result);
    }
    })
    .subscribe(client => {
      // console.log(data);
      let successMsg = '';
      if (clientId) {
        // tslint:disable-next-line:no-shadowed-variable
        const index = this.dataSource.data.findIndex(client => client._id === clientId);
        this.dataSource.data[index] = client;
        successMsg = 'Client updated';
      } else {
      this.dataSource.data.push(client);
      successMsg = 'Client created';
    }
      this.dataSource.data = [...this.dataSource.data];    // automatically update the table
      this.snackBar.open(successMsg, 'Success', {
        duration: 500,
      });
    }, err => this.errorHandler(err, 'Failed to create client'));
  }
  private errorHandler(error, massage) {
    console.log(error);
    this.snackBar.open(massage, 'Error', {
      duration: 2000,
    });
  }
}

