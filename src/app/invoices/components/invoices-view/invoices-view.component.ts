import { InvoiceService } from './../../services/invoice.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Invoice } from '../../models/invoice';
import { saveAs} from 'file-saver';

@Component({
  selector: 'app-invoices-view',
  templateUrl: './invoices-view.component.html',
  styleUrls: ['./invoices-view.component.scss']
})
export class InvoicesViewComponent implements OnInit {
  total: number;
  invoice: Invoice;
  saleTax = 0;
  constructor(private route: ActivatedRoute,
    private invoiceService: InvoiceService) { }

  ngOnInit() {
    this.route.data.subscribe((data: {invoice: Invoice}) => {
      this.invoice = data.invoice;
      console.log(this.invoice);
      if (typeof this.invoice.qty !== 'undefined' && typeof this.invoice.rate !== 'undefined') {
        this.total = this.invoice.qty * this.invoice.rate;
      }
      if (typeof this.invoice.tax !== 'undefined') {
        this.saleTax = this.total * (this.invoice.tax / 100);
      }
      this.total += this.saleTax;
    });
  }
  downloadHandler(id) {
    this.invoiceService.downloadInvoice(id)
    .subscribe(data => {
      console.log(data);
      saveAs(data, this.invoice.item);
    },
    err => {
      console.error(err);
    });
  }

}
