// import { Component, Inject } from '@angular/core';
// import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

// @Component({
//     // tslint:disable-next-line:component-selector
//     selector: 'dialog-overview-example-dialog',
//     template: `<h1 mat-dialog-title>Hi {{data.name}}</h1>
//     <div mat-dialog-content>
//       <p>What's your favorite animal?</p>
//       <mat-form-field>
//         <input matInput [(ngModel)]="data.animal">
//       </mat-form-field>
//     </div>
//     <div mat-dialog-actions>
//       <button mat-button (click)="onNoClick()">No Thanks</button>
//       <button mat-button [mat-dialog-close]="data.animal" cdkFocusInitial>Ok</button>
//     </div>`
//     // 'dialog-overview-example-dialog.html',
//   })
//   // tslint:disable-next-line:component-class-suffix
//   export class ClientFormDialog {
//     constructor(
//       public dialogRef: MatDialogRef<ClientFormDialog>,
//       @Inject(MAT_DIALOG_DATA) public data: any) { }
//     onNoClick(): void {
//       this.dialogRef.close();
//     }
//   }
