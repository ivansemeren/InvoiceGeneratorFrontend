import { ClientService } from './../../services/client.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss']
})
export class FormDialogComponent implements OnInit {

  title = 'New Title';
  clientForm: FormGroup;         // reactive form module
  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder,
    private clientService: ClientService, public snackBar: MatSnackBar) { }

    onNoClick(): void { this.dialogRef.close(); }

    ngOnInit() {
      this.initClientForm();
      // tslint:disable-next-line:no-debugger
      // debugger;
      console.log(this.data);
      if (this.data && this.data.clientId) {
        this.setClientToForm(this.data.clientId);
      }
    }

    private setClientToForm(clientId) {
      this.title = 'Edit Client';
      this.clientService.getClient(clientId)
      .subscribe(client => {
        this.clientForm.patchValue(client);
      }, err => this.errorHandler(err, 'Failed to upload'));
    }

    private initClientForm() {
      this.clientForm = this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', Validators.required],
      });
    }
    private errorHandler(error, massage) {
      console.log(error);
      this.snackBar.open(massage, 'Error', {
        duration: 2000,
      });
    }
}
