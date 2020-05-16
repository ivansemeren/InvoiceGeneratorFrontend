import { EditInvoiceResolverService } from './services/edit-invoice-resolver.service';
import { HttpClientModule } from '@angular/common/http';
import { InvoiceService } from './services/invoice.service';
// import { Invoice } from './../invoice/models/invoice';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceListingComponent } from './components/invoice-listing/invoice-listing.component';
import { MaterialModule } from '../shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InvoiceFormComponent } from './components/invoice-form/invoice-form.component';
import { InvoicesViewComponent } from './components/invoices-view/invoices-view.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule
  ],
  declarations: [InvoiceListingComponent, InvoiceFormComponent, InvoicesViewComponent],
  exports: [InvoiceListingComponent, InvoiceFormComponent],
  providers: [InvoiceService, EditInvoiceResolverService]
})
export class InvoicesModule { }
