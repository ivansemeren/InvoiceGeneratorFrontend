// import { AuthService } from './../core/services/auth.service';
import { AuthGuardService } from './../core/services/auth-guard.service';
import { InvoiceFormComponent } from './../invoices/components/invoice-form/invoice-form.component';
import { ClientListingComponent } from './../clients/components/client-listing/client-listing.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent} from './dashboard.component';
import { InvoiceListingComponent } from '../invoices/components/invoice-listing/invoice-listing.component';
import { EditInvoiceResolverService } from '../invoices/services/edit-invoice-resolver.service';
import { Invoice } from '../invoices/models/invoice';
import { InvoicesViewComponent } from '../invoices/components/invoices-view/invoices-view.component';


const routes: Routes = [{
  path: '',
  component : DashboardComponent,
  canActivate: [AuthGuardService],
  children: [
     {
      path: 'invoices',
      component: InvoiceListingComponent,
      canActivateChild: [AuthGuardService]
    }, {
      path: 'clients',
      component: ClientListingComponent,
      canActivateChild: [AuthGuardService]
    }, {
      path: 'invoices/new',
      component: InvoiceFormComponent,
      canActivateChild: [AuthGuardService]
    }, {
      path: 'invoices/:id/view',
      component: InvoicesViewComponent,
      canActivateChild: [AuthGuardService],
      resolve: {
        invoice: EditInvoiceResolverService
      }
    }, {
      path: 'invoices/:id',
      component: InvoiceFormComponent,
      canActivateChild: [AuthGuardService],
      resolve: {
        invoice: EditInvoiceResolverService
      }

    },
    {
      path: '**',
      redirectTo: 'invoices',
      canActivateChild: [AuthGuardService]
    }
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
